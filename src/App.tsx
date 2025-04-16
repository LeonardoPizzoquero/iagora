import { useEffect, useState } from 'react'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { BsRobot } from 'react-icons/bs'
import { db } from './firebase/config'
import { Link } from './types'
import './App.css'

function App() {
  const [links, setLinks] = useState<Link[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        // Create a query against the links collection, ordered by created_at in descending order
        const linksQuery = query(
          collection(db, 'links'),
          orderBy('created_at', 'desc')
        )
        const querySnapshot = await getDocs(linksQuery)
        
        const linksData: Link[] = []
        querySnapshot.forEach((doc) => {
          const data = doc.data()
          linksData.push({
            id: doc.id,
            title: data.title,
            url: data.url,
            created_at: data.created_at
          })
        })
        
        setLinks(linksData)
      } catch (error) {
        console.error("Error fetching links: ", error)
      } finally {
        setLoading(false)
      }
    }

    fetchLinks()
  }, [])

  // Function to format the timestamp as relative time
  const formatRelativeTime = (timestamp: unknown) => {
    if (!timestamp) return ''
    
    const now = new Date()
    // Check if timestamp is a Firestore Timestamp object (has toDate method)
    let date: Date;
    
    if (timestamp && typeof timestamp === 'object' && 'toDate' in timestamp && typeof timestamp.toDate === 'function') {
      // It's a Firestore Timestamp
      date = timestamp.toDate();
    } else {
      // Try to convert to Date safely
      try {
        date = new Date(String(timestamp));
      } catch (error) {
        console.error('Error converting timestamp to Date:', error);
        date = now; // Fallback to current date if conversion fails
      }
    }
    
    const diffInMs = now.getTime() - date.getTime()
    
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutos atrás`
    } else if (diffInHours < 24) {
      return `${diffInHours} horas atrás`
    } else {
      return `${diffInDays} dias atrás`
    }
  }

  return (
    <div className="app-container">
      <header className="header">
        <div className="logo-container">
          <BsRobot className="logo-icon" />
          <h1 className="logo-text">IAgora?</h1>
        </div>
      </header>
      
      <main className="content">
        {loading ? (
          <div className="loading">Carregando links...</div>
        ) : (
          <ul className="links-list">
            {links.map((link, index) => (
              <li key={link.id} className="link-item">
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="link-title">
                  {index + 1}. {link.title}
                </a>
                <div className="link-time">{formatRelativeTime(link.created_at)}</div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  )
}

export default App
