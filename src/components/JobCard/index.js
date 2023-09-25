import {Link, withRouter} from 'react-router-dom'
import {BsFillStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import './index.css'

const JobCard = props => {
  const {jobDetails} = props
  const updatedData = {
    companyLogoUrl: jobDetails.company_logo_url,
    employmentType: jobDetails.employment_type,
    id: jobDetails.id,
    jobDescription: jobDetails.job_description,
    location: jobDetails.location,
    packagePerAnnum: jobDetails.package_per_annum,
    rating: jobDetails.rating,
    title: jobDetails.title,
  }

  return (
    <Link to={`/jobs/${updatedData.id}`} className="link">
      <li className="job-item">
        <div className="title-container">
          <img
            className="company-logo"
            src={updatedData.companyLogoUrl}
            alt="company logo"
          />
          <div className="job-title-container">
            <h4 className="job-title">{updatedData.title}</h4>
            <div className="rating-container">
              <BsFillStarFill className="star-image" />
              <p className="rating">{updatedData.rating}</p>
            </div>
          </div>
        </div>
        <div className="job-location-salary">
          <div className="location-and-type">
            <div className="location-container">
              <MdLocationOn className="location-icon" />
              <p className="location">{updatedData.location}</p>
            </div>
            <div className="location-container">
              <BsFillBriefcaseFill className="location-icon" />
              <p className="location">{updatedData.employmentType}</p>
            </div>
          </div>
          <p className="package">{updatedData.packagePerAnnum}</p>
        </div>
        <hr className="break-line" />
        <h3 className="description-heading">Description</h3>
        <p className="job-description">{updatedData.jobDescription}</p>
      </li>
    </Link>
  )
}

export default withRouter(JobCard)
