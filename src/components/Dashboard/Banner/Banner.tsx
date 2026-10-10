import './Banner.css'
import logo from '../../../assets/logo.png'
const Banner = () => {
  return (
    <div className="banner-container">
      <img src={logo} alt="Logo" />
      <h2>Olá, Coodernador(a)</h2>
      <p>Colégio Ary João Dresch</p>
    </div>
  )
}

export default Banner