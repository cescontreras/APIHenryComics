const {View} = require('grandjs')

const style = {
    container:{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"space-around",
        width:"100vw"
    },
    paragraph:{
        fontSize:"large"
    }
}

const ResetPassUser = ({datos}) => {

    return (
        <div style={style.container}>
            <h1>Recuperación de usuario o contraseña</h1>
            <br/>
            <p style={style.paragraph}>Tu usuario es: {datos.username}</p>
            <br/>
            <a type='button' className='btn btn-danger' 
                href={`http://localhost:3000/resetPass?id=${datos.id}`}>
                {`http://localhost:3000/resetPass?id=${datos.id}`}
            </a>
        </div>
    )
}

module.exports = ResetPassUser