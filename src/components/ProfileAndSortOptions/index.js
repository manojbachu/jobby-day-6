import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  progress: 'PROGRESS',
  failure: '"FAILURE',
}

class ProfileAndSortOptions extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    profileDetails: {},
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.progress})

    const apiUrl = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const profileDetails = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({profileDetails, apiStatus: apiStatusConstants.success})
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onSelectSalaryRange = event => {
    const {selectPackage} = this.props
    selectPackage(event.target.value)
  }

  onSelectEmployType = event => {
    const {selectEmploymentType} = this.props
    selectEmploymentType(event.target.value)
  }

  onClickRetry = () => {
    this.getProfileDetails()
  }

  renderEmploymentOptions = () => (
    <>
      <ul className="sort-options">
        {employmentTypesList.map(eachOption => (
          <li className="option" key={eachOption.employmentTypeId}>
            <input
              className="option-input"
              type="checkbox"
              id={eachOption.employmentTypeId}
              value={eachOption.employmentTypeId}
              onChange={this.onSelectEmployType}
            />
            <label htmlFor={eachOption.employmentTypeId} className="label">
              {eachOption.label}
            </label>
          </li>
        ))}
      </ul>
      <hr className="break-line" />
    </>
  )

  renderSalaryOptions = () => (
    <>
      <ul className="sort-options">
        {salaryRangesList.map(eachOption => (
          <li className="option" key={eachOption.salaryRangeId}>
            <input
              className="option-input"
              type="radio"
              id={eachOption.salaryRangeId}
              value={eachOption.salaryRangeId}
              name="salary"
              onChange={this.onSelectSalaryRange}
            />
            <label htmlFor={eachOption.salaryRangeId} className="label">
              {eachOption.label}
            </label>
          </li>
        ))}
      </ul>
      <hr className="break-line" />
    </>
  )

  profileCard = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <div className="profile-card">
        <img src={profileImageUrl} alt="profile" className="profile-image" />
        <h1 className="user-name">{name}</h1>
        <p className="short-bio">{shortBio}</p>
      </div>
    )
  }

  profileFailureView = () => (
    <div className="profile-failure">
      <button
        type="button"
        className="retry-button"
        onClick={this.onClickRetry}
      >
        Retry
      </button>
    </div>
  )

  loadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfileCard = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.progress:
        return this.loadingView()
      case apiStatusConstants.success:
        return this.profileCard()
      case apiStatusConstants.failure:
        return this.profileFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="profile-filters">
        {this.renderProfileCard()}
        <hr className="break-line" />
        {this.renderEmploymentOptions()}
        {this.renderSalaryOptions()}
      </div>
    )
  }
}

export default ProfileAndSortOptions
