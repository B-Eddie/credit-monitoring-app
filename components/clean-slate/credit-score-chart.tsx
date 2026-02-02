"use client"

import { ResponsiveContainer, XAxis, YAxis, Tooltip, Area, AreaChart } from "recharts"

const data = [
  { month: "Feb", score: 698 },
  { month: "Mar", score: 705 },
  { month: "Apr", score: 702 },
  { month: "May", score: 715 },
  { month: "Jun", score: 710 },
  { month: "Jul", score: 722 },
  { month: "Aug", score: 718 },
  { month: "Sep", score: 725 },
  { month: "Oct", score: 730 },
  { month: "Nov", score: 728 },
  { month: "Dec", score: 730 },
  { month: "Jan", score: 742 },
]

export function CreditScoreChart() {
  return (
    <div className="h-32 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00D9A4" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#00D9A4" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="month" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }}
            interval={2}
          />
          <YAxis 
            domain={[680, 760]}
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }}
            width={35}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#1A232D',
              border: '1px solid rgba(0, 217, 164, 0.2)',
              borderRadius: '12px',
              color: 'white',
              fontSize: '12px',
              padding: '8px 12px'
            }}
            labelStyle={{ color: 'rgba(255,255,255,0.7)' }}
            formatter={(value: number) => [value, 'Score']}
          />
          <Area
            type="monotone"
            dataKey="score"
            stroke="#00D9A4"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorScore)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
