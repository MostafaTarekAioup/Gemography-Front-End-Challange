import React from 'react'
import './SingleRepo.style.css'
import Moment from 'react-moment';

const SingleRepo = ({ html_url , name ,owner , open_issues , description , stargazers_count , created_at}) => {
 return (
  <article>
   <div className="article_container">
      <div className="repo_owner_avatar">
       <img src={owner.avatar_url} alt={owner.login} />
      </div>
      <div className="repo_details">
       <h3><a href={html_url} target={name}>{name}</a></h3>
       <p className='repo_description'>{description === null? 'No Description' : description.substring(0, 200)}</p>
       <div className="more_repo_info">
        <p className='stars'>Stars {stargazers_count}</p>
        <p className='issues'>Issues {open_issues}</p>
        <p className='time_created'><Moment fromNow>{created_at}</Moment> by <span>{owner.login}</span></p>
       </div>
      </div>
   </div>
  </article>
 )
}

export default SingleRepo
