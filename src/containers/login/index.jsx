import { connect }                  from 'react-redux'
import React, { PropTypes }         from 'react'
import * as ClassNames              from 'classnames'
import * as styles                  from './style.scss'

class Login extends React.Component {
    static propTypes = {
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired
    }

    state = {
        username: '',
        password: ''
    }

    componentDidMount () {

    }

    componentWillUnmount () {

    }

    componentWillReceiveProps (nextProps) {

    }

    render () {
        return (
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.loginBox}>
                        <a className={styles.logoLink} href="/"><img className={styles.logo} src={require('../../assets/images/logo.png')}/></a>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
