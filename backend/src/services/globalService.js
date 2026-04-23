const deleteService = require("./deleteService");

async function update(Model, id, data) {
    const documento = await Model.findById(id);
    if (!documento){
         const error = new Error("ID no encontrado");
         error.statusCode = 404;
         throw error;
    }
    if (await deleteService.isDeleted(documento)) {
        const error = new Error("Documento eliminado o no disponible");
        error.statusCode = 404;
         throw error;
    }

    documento.set(data);
    console.log("Actualizando documento con ID:" + id);
    await documento.save();
    return documento;
}

async function getDocuments(Model, options = {} ,filtro = {}) {
  try {
    const query = { ...filtro, isDeleted: false };
    const { cursor, limit } = options;
    const limitNum = parseInt(limit, 10);
    const isPaginated = !isNaN(limitNum) && limitNum > 0;

    if (isPaginated && cursor) {
      query._id = { $lt: cursor };
    }

    let mongooseQuery = Model.find(query).sort({ _id: -1 });

    let docs = [];
    let hasNextPage = false;
    let nextCursor = null;

    if (isPaginated) {
      const docsToFetch = limitNum + 1;
      docs = await mongooseQuery.limit(docsToFetch).exec();

      if (docs.length === docsToFetch) {
        hasNextPage = true;
        docs.pop();
      }

      if (docs.length > 0) {
        nextCursor = docs[docs.length - 1]._id.toString();
      }

    } else {
      docs = await mongooseQuery.exec();
    }

    const resultado = {
      docs: docs,
      limit: isPaginated ? limitNum : docs.length,
      hasNextPage: hasNextPage,
      nextCursor: nextCursor,
    };

    return resultado;

  } catch (error) {
    const mensajeError = "Error al obtener documentos";
    console.error(mensajeError, error);
    throw new Error(mensajeError + " - " + error.message);
  }
}

async function getDocument(Model, filtro = {}) {
  try {
    const query = { ...filtro, isDeleted: false };
    const response = await Model.findOne(query);

    return response;

  } catch (error) {
     const mensajeError = "Error al obtener documento";
     console.error(mensajeError, error);
     throw new Error(mensajeError + " - " + error.message);
  }
}

module.exports = {
    update,
    getDocument,
    getDocuments,
};