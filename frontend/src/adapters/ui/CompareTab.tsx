import { useEffect, useMemo, useState } from 'react'
import { useApi } from '../../core/application/useApi'
import type { ComparisonDTO } from '../../core/domain/types'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function CompareTab() {
  const api = useApi()
  const [rows, setRows] = useState<ComparisonDTO[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let alive = true
    setLoading(true)
    setError(null)
    api
      .getComparison()
      .then(d => { if (alive) setRows(d) })
      .catch(e => { if (alive) setError(e?.message ?? 'Failed to load') })
      .finally(() => { if (alive) setLoading(false) })
    return () => { alive = false }
  }, [api])

  const data = useMemo(
    () => rows.map(x => ({ name: x.route.routeId, baseline: x.baseline, comparison: x.comparison })),
    [rows]
  )

  if (loading) return <div className="text-sm text-gray-600">Loading…</div>
  if (error) return <div className="text-sm text-red-600">Error: {error}</div>
  if (!rows.length) return <div className="text-sm text-gray-600">No data</div>

  return (
    <div className="space-y-4">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="text-left">
            <th className="p-2">route</th>
            <th className="p-2">baseline</th>
            <th className="p-2">comparison</th>
            <th className="p-2">% diff</th>
            <th className="p-2">compliant</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.route.routeId} className="border-t">
              <td className="p-2">{r.route.routeId}</td>
              <td className="p-2">{r.baseline.toFixed(4)}</td>
              <td className="p-2">{r.comparison.toFixed(4)}</td>
              <td className="p-2">{r.percentDiff.toFixed(2)}%</td>
              <td className="p-2">{r.compliant ? '✅' : '❌'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="h-80 bg-white p-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="baseline" />
            <Bar dataKey="comparison" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
