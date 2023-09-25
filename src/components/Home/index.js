import Header from '../Header'
import './index.css'

const Home = props => {
  const findJobs = () => {
    const {history} = props
    history.replace('/jobs')
  }
  return (
    <>
      <Header />
      <div className="home-container">
        <div className="home-content">
          <h1 className="home-heading">Find The Job That Fits Your Life</h1>
          <p className="home-text">
            Millions of people are searching for jobs, salary information,
            company reviews . Find the job that fits your abilities and
            potential.
          </p>
          <button onClick={findJobs} type="button" className="find-jobs-button">
            Find Jobs
          </button>
        </div>
      </div>
    </>
  )
}

export default Home
