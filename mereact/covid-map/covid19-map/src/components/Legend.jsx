import React from 'react'

export default function Legend({legendItems}) {
    return (
        <div style={{
            display : "flex",
            alignItems : "stretch"
        }}>
            {legendItems.map(item => (
                <div key={item.title} style={{
                    backgroundColor : item.color,
                    flex : 1,
                    display : "flex",
                    alignItems : "center",      //vertical alignment
                    justifyContent : "center",   //horizontal alignment
                    color   : item.textColor,
                    height : "10vh",
                    fontWeight : "bold",
                    fontSize : "1.5rem"
                }}>
                    <span>
                        {item.title}
                    </span>
                </div>
            ))}
        </div>
    )
}
