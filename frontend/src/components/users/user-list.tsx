import { useQuery } from '@tanstack/react-query'
import type { Users } from '#/api/interfaces'

export function UserList() {
    const { data, isPending, error } = useQuery<Users>({
    queryKey: ['manufacturer'],
    queryFn: () => fetch('http://localhost:8080/users')
        .then(r => r.json()),
  })

  if (isPending) return <span>Loading...</span>
  if (error) return <span>Oops!</span>

  return (
    <table>
        <thead>
            <tr><th>Id</th><th>Name</th><th>Email</th></tr>
        </thead>
        <tbody>
            {data.map(m => 
                <tr key={m.userId}><td>{m.userId}</td><td>{m.userName}</td><td>{m.email}</td></tr>
            )}        
        </tbody>
      </table>
  )
}
