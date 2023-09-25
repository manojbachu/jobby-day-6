import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'

import JobCard from '../JobCard'
import Header from '../Header'
import ProfileAndSortOptions from '../ProfileAndSortOptions'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  progress: 'PROGRESS',
  failure: '"FAILURE',
}

class Jobs extends Component {
  state = {
    searchInput: '',
    searchValue: '',
    employmentType: [],
    salaryRange: 0,
    jobsList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({apiStatus: apiStatusConstants.progress})
    const {searchValue, employmentType, salaryRange} = this.state

    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentType.join()}&minimum_package=${salaryRange}&search=${searchValue}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    console.log(response)
    const data = await response.json()
    if (response.ok) {
      this.setState({
        jobsList: data.jobs,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  getSalaryRange = id => {
    this.setState({salaryRange: id}, this.getJobs)
  }

  selectEmploymentType = id => {
    const {employmentType} = this.state

    const isNotInList = employmentType.filter(each => each === id)
    if (isNotInList.length === 0) {
      this.setState(
        prevState => ({
          employmentType: [...prevState.employmentType, id],
        }),
        this.getJobs,
      )
    } else {
      this.setState(
        {
          employmentType: employmentType.filter(each => each !== id),
        },
        this.getJobs,
      )
    }
  }

  onClickRetry = () => {
    this.getJobs()
  }

  onClickSearch = event => {
    const {searchInput} = this.state

    if (event.key === 'enter') {
      this.setState({searchValue: searchInput}, this.getJobs)
    } else {
      this.setState({searchValue: searchInput}, this.getJobs)
    }
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  noJobsFound = () => (
    <div className="failure-view">
      <img
        className="failure-image"
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1 className="failure-heading">No Jobs Found</h1>
      <p className="failure-text">
        We could not find any jobs. Try other filter.
      </p>
    </div>
  )

  loadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  jobsFailureView = () => (
    <div className="failure-view">
      <img
        className="failure-image"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-text">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        onClick={this.onClickRetry}
        className="retry-button"
      >
        Retry
      </button>
    </div>
  )

  renderJobs = () => {
    const {jobsList} = this.state

    return (
      <ul className="job-container">
        {jobsList.map(eachJob => (
          <JobCard jobDetails={eachJob} key={eachJob.id} />
        ))}
      </ul>
    )
  }

  renderAllJobs = () => {
    const {apiStatus, jobsList} = this.state

    switch (apiStatus) {
      case apiStatusConstants.progress:
        return this.loadingView()
      case apiStatusConstants.success:
        return jobsList.length > 0 ? this.renderJobs() : this.noJobsFound()
      case apiStatusConstants.failure:
        return this.jobsFailureView()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state

    return (
      <>
        <Header />
        <div className="jobs">
          <div className="jobs-search-container search-sm">
            <input
              type="search"
              className="search-input"
              placeholder="Search"
              onChange={this.onChangeSearch}
              value={searchInput}
            />

            <button
              type="button"
              data-testid="searchButton"
              className="search-button"
              onClick={this.onClickSearch}
            >
              <BsSearch className="search-icon" />
            </button>
          </div>
          <div className="jobs-container">
            <>
              <ProfileAndSortOptions
                selectEmploymentType={this.selectEmploymentType}
                selectPackage={this.getSalaryRange}
              />
              <div className="all-jobs-container">
                <div className="jobs-search-container search-lg">
                  <input
                    type="search"
                    className="search-input"
                    placeholder="Search"
                    onChange={this.onChangeSearch}
                    value={searchInput}
                  />
                  <button
                    type="button"
                    data-testid="searchButton"
                    className="search-button"
                    onClick={this.onClickSearch}
                    onKeyDown={this.onClickSearch}
                  >
                    <BsSearch className="search-icon" />
                  </button>
                </div>
                {this.renderAllJobs()}
              </div>
            </>
          </div>
        </div>
      </>
    )
  }
}
export default Jobs
