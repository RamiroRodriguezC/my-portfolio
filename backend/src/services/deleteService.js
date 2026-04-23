const mongoose = require("mongoose");

async function runCascadeDelete(Model, filter, config) {
    const reporteKey = Model.collection.name;
    const reporteFinal = { [reporteKey]: 0 };

    const baseQuery = { ...filter, isDeleted: false };
    const padres = await Model.find(baseQuery).select('_id').lean();

    if (padres.length === 0) {
        return reporteFinal;
    }

    const idsPadres = padres.map(doc => doc._id);

    console.log("[Cascade - " + Model.modelName + "] Iniciando borrado de " + padres.length + " documentos...");

    if (config.cascade) {
        for (const documentoHijo of config.cascade) {
            const modeloHijo = mongoose.model(documentoHijo.modelName);
            const queryHijo = documentoHijo.buildQuery(idsPadres);
            const childResult = await modeloHijo.delete(queryHijo);

            for (const [key, value] of Object.entries(childResult)) {
                reporteFinal[key] = (reporteFinal[key] || 0) + value;
            }
        }
    }

    const selfResult = await softDelete(Model, { _id: { $in: idsPadres } });

    reporteFinal[reporteKey] += selfResult.modifiedCount;

    console.log("[Cascade - " + Model.modelName + "] Finalizado. Reporte:", reporteFinal);
    return reporteFinal;
}

function softDelete(Model, filter) {
    return Model.updateMany(
        filter,
        { $set: { isDeleted: true } }
    );
}

function isDeleted(documento) {
    return documento.isDeleted;
}

module.exports = {
    runCascadeDelete,
    isDeleted
};