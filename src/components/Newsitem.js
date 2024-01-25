import React from 'react'

const Newsitem =(props)=> {

  
    let { title, description, imageurl,url,author,date ,source} = props;
    return (
      <div>
        <div className="my-3">
          <div className="card" >
            <img src={!imageurl?"https://images.moneycontrol.com/static-mcnews/2019/04/gavel-3575414_960_720-770x424.jpg":imageurl} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{title}... </h5>
              <p className="card-text">{description}...</p>
              <span className="badge text-bg-danger">{source}</span>
              <p className="card-text"><small className="text-muted">By {author?author:"unknown"} on <br />{new Date(date).toGMTString()}</small></p>
              <a href={url} className="btn btn-sm btn-primary" target="main">Read More</a>
            </div>
          </div>
        </div>
      </div>
    )
    
}

export default Newsitem 
