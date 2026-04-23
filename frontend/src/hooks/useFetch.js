import { useState, useEffect } from 'react'
import api from '../api/api'

const useFetch = (url, deps = []) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!url) {
      setLoading(false)
      return
    }

    let cancelled = false

    const fetchData = async () => {
      setLoading(true)
      setError(null)

      try {
        const res = await api.get(url)
        if (!cancelled) {
          setData(res.data.data ?? res.data)
        }
      } catch (err) {
        if (!cancelled) {
          const msg = err.response?.data?.message || 'Error de conexion'
          setError(msg)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchData()

    return () => { cancelled = true }

  }, deps)

  return { data, loading, error }
}

export default useFetch