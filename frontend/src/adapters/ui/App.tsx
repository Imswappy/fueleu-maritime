import { useState } from 'react'
import RoutesTab from './RoutesTab'
import CompareTab from './CompareTab'
import BankingTab from './BankingTab'
import PoolingTab from './PoolingTab'

const tabs = ['Routes','Compare','Banking','Pooling'] as const

export default function App(){
  const [tab,setTab]=useState<typeof tabs[number]>('Routes')
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="p-4 border-b bg-white">
        <h1 className="text-2xl font-semibold">Fuel EU Compliance Dashboard</h1>
        <nav className="mt-4 flex gap-2">
          {tabs.map(t=>
            <button key={t} onClick={()=>setTab(t)} className={`px-3 py-1 rounded ${tab===t?'bg-blue-600 text-white':'bg-gray-200'}`}>
              {t}
            </button>
          )}
        </nav>
      </header>
      <main className="p-4">
        {tab==='Routes'&&<RoutesTab/>}
        {tab==='Compare'&&<CompareTab/>}
        {tab==='Banking'&&<BankingTab/>}
        {tab==='Pooling'&&<PoolingTab/>}
      </main>
    </div>
  )
}
