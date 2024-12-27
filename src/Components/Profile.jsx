import '../styles/profile.css'

export default function Profile({ name, image, handleClick }){
    return (
        <div className="card" onClick={(e) => handleClick(e, name)}>
            <div className="image-container"><img src={image} alt={name} /></div>
            <div className="details">
                <div>{name}</div>
            </div>
        </div>
    )
}