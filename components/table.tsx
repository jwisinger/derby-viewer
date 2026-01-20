import postgres from 'postgres'
import { timeAgo } from '@/lib/utils'
import Image from 'next/image'
import RefreshButton from './refresh-button'
import { seed } from '@/lib/seed'

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export default async function Table() {
  let data
  let startTime = Date.now()

  try {
    data = await sql`SELECT * FROM "raceTable"`
  } catch (e: any) {
      throw e
  }

  const racer = data
  
  return (
    <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 p-4 shadow-2xl ring-1 ring-white/60 rounded-2xl backdrop-blur-lg max-w-2xl mx-auto w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="space-y-2">
          <Image
            src="/GIRL3.jpg"
            alt="G.I.R.L. Logo"
            width={300}
            height={120}
            className="h-24 w-auto"
          />
        </div>
        <RefreshButton />
      </div>
      <div className="space-y-1">
        {racer.map((user) => {
          const levelColorMap: { [key: string]: string } = {
            'Daisy': 'rgb(0, 153, 255)',
            'Brownie': 'rgb(102, 51, 0)',
            'Junior': 'rgb(153, 51, 153)',
            'Cadette': 'rgb(204, 0, 0)',
            'Senior': 'rgb(255, 102, 51)',
            'Ambassador': 'rgb(255, 153, 51)',
            'Adult': 'rgb(204, 204, 204)'
          };

          const levelColor = levelColorMap[user.Level] || 'rgb(128, 128, 128)';
          const darkerColor = levelColorMap[user.Level] ?
            `rgb(${Math.max(0, parseInt(levelColor.match(/\d+/g)![0]) - 60)}, ${Math.max(0, parseInt(levelColor.match(/\d+/g)![1]) - 60)}, ${Math.max(0, parseInt(levelColor.match(/\d+/g)![2]) - 60)})` :
            'rgb(80, 80, 80)';

          const colorStyle = {
            background: `linear-gradient(135deg, ${levelColor} 0%, ${darkerColor} 100%)`,
            boxShadow: `0 4px 15px rgba(0, 0, 0, 0.2), inset -1px -1px 3px rgba(255, 255, 255, 0.2)`
          };

          return (
            <div
              key={user.Number}
              className="bg-white/80 backdrop-blur rounded-lg p-2 shadow-lg hover:shadow-xl transition-shadow border border-white/40 flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-br p-1 rounded-full ring-2 ring-white shadow-lg flex-shrink-0" style={colorStyle}>
                  <Image
                    src={`data:image/jpeg;base64,${Buffer.from(user.Image).toString('base64')}`}
                    alt={user.Name}
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg">{user.Name}</p>
                  <p className="text-sm text-gray-600">Troop {user.Troop}</p>
                </div>
              </div>
              <span className="inline-block px-3 py-1 rounded-full text-sm font-bold text-white bg-gradient-to-r flex-shrink-0" style={colorStyle}>
                {user.Level}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  )
}
