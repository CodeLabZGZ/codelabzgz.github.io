const people = [
  { username: 'Lindsay Walton', events: 0, points: 0, role: 'Member' },
  { username: 'Lindsay Walton', events: 0, points: 0, role: 'Member' },
  { username: 'Lindsay Walton', events: 0, points: 0, role: 'Member' },
  { username: 'Lindsay Walton', events: 0, points: 0, role: 'Member' },
  { username: 'Lindsay Walton', events: 0, points: 0, role: 'Member' },
]

export default function Page() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 capitalize pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      username
                    </th>
                    <th scope="col" className="px-3 py-3.5 capitalize text-center text-sm font-semibold text-gray-900">
                      role
                    </th>
                    <th scope="col" className="px-3 py-3.5 capitalize text-center text-sm font-semibold text-gray-900">
                      events
                    </th>
                    <th scope="col" className="px-3 py-3.5 capitalize text-center text-sm font-semibold text-gray-900">
                      points
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {people.map((person) => (
                    <tr key={person.username} className="even:bg-gray-50">
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-6">
                        {person.username}
                      </td>
                      <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">{person.role}</td>
                      <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">{person.events}</td>
                      <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">{person.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
