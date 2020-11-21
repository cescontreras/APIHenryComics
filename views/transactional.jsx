const {View} = require('grandjs')

const style = {

    container:{
        width: "500px",
        margin: "0 auto",
        backgroundColor:"#ffffff",
        borderRadius: "8px"
    },
    barra:{
        width: "500px",
        margin: "0 auto",
        padding:" 15px 40px",
        backgroundColor: "#d12828",
        borderRadius: "8px",
    },
    td:{
        letterSpacing: "1px",
        textAlign: "center",
        padding: "8px"
    },
    tbody:{
        textAlign: "center",
        
    },
    boton:{
        textDecoration: "none",
        color: "#ffffff",
        padding:"10px",
        backgroundColor:"#343a40",
        borderRadius:"6px",
        marginBottom:"10px"
    },
    table:{
        marginTop:"15px",
        borderCollapse: "collapse",
        width: "100%"
    }

}

const Tabla = ({variable}) => {
    let saludo;
    let descripcion;
    
    if(variable.status === 'Pagado'){
        saludo = '¡Gracias por tu compra!'
        descripcion = 'En instantes tu orden estará siendo procesada.'
    } else{
        saludo = '¡Gracias por tu elección!'
        descripcion = 'Tu pago se encuentra pendiente; por favor envíanos el comprobante a este enlace:'
    }

    return (
        <div>
            <div style={style.barra}></div>
            <div style={style.container}>
                <h1>{saludo}</h1>
                <p>{descripcion}</p>
                {variable.status !== 'Pagado' && <a type='button' style={style.boton} href={`http://localhost:3000/payment?status=pago&orden=${variable.orden}&check=${variable.check}`}>Enviar comprobante</a>}
                <table style={style.table}>
                    <thead>
                        <tr>
                            <th style={style.td}>Productos</th>
                            <th style={style.td}>Precio</th>
                            <th style={style.td}>Cantidad</th>
                            <th style={style.td}>Total</th>
                        </tr> 
                    </thead>
                    <tbody style={style.tbody}>
                        {variable.products.map(p => 
                        <tr>
                            <td style={style.td}>{p.name}</td>
                            <td style={style.td}>{p.price.toString()}</td>
                            <td style={style.td}>{p.lineaDeOrden.quantity.toString()}</td>
                            <td style={style.td}>{(p.lineaDeOrden.price * p.lineaDeOrden.quantity).toString()}</td>
                        </tr>)}

                    </tbody>
                    </table>
            </div>
            <div style={style.barra}></div>
        </div>
    )
}

module.exports = Tabla