import './Badge.css'
import { useEffect, useState } from "react"
import { getStatus } from "../../../service/api";


const Badge = () => {
    const [online, setOnline] = useState<boolean | null>(null);
    
    useEffect(() => {
        async function verificarAPI(){
            try {
                const data = await getStatus();
                setOnline(data.status==="online")
            } catch (error) {
                setOnline(false)
            }
        }
        verificarAPI();
    }, [])
  return (
    <div className={`api-badge ${online === true ? 'online' : online === false ? 'offline' : 'Cheking...'}`}>
        <span className="api-badge-dot"/>
            {online === true ? 'API Online' : online === false ? 'API Offline' : 'Verificando API...'}
    </div>
  )
}

export default Badge