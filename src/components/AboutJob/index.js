import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsFillStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'

import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  progress: 'PROGRESS',
  failure: '"FAILURE',
}

class AboutJob extends Component {
  state = {
    jobDetails: {},
    similarJobs: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.progress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      const updatedData = {
        jobDetails: data.job_details,
        similarJobs: data.similar_jobs,
        apiStatus: apiStatusConstants.success,
      }
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderJobDetails = () => {
    const {jobDetails} = this.state
    console.log(jobDetails)
    return <p>wait</p>
  }

  render() {
    return (
      <>
        <Header />
        <div className="about-job">{this.renderJobDetails()}</div>
      </>
    )
  }
}

export default AboutJob
