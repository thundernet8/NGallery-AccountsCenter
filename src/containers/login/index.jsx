import { connect }                  from 'react-redux'
import React, { PropTypes }         from 'react'
import ClassNames                   from 'classnames'
import * as styles                  from './style.scss'
import TextField                    from 'material-ui/TextField'
import RaisedButton                 from 'material-ui/RaisedButton'
import Meta                         from '../../components/meta'
import { FormattedMessage, injectIntl, defineMessages }         from 'react-intl'

const intlMsgs = defineMessages({
    nameInput: {
        id: '_NameOrEmail',
        defaultMessage: 'Name or Email'
    },
    passInput: {
        id: '_Password',
        defaultMessage: 'Password'
    },
    submitBtn: {
        id: '_Login',
        defaultMessage: 'Login'
    }
})

class Login extends React.Component {
    static propTypes = {
        username: PropTypes.string,
        password: PropTypes.string,
        submitting: PropTypes.bool
    }

    state = {
        username: '',
        password: '',
        submitting: false
    }

    onUserNameChange = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    onPassChange = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    onSubmit = () => {
        if (this.submitting) {
            return false
        }
        this.setState({
            submitting: true
        })
    }

    componentDidMount () {

    }

    componentWillUnmount () {

    }

    componentWillReceiveProps (nextProps) {

    }

    render () {
        const meta = {
            title: 'Sign In',
            description: 'Sign in to explore'
        }

        const {formatMessage} = this.props.intl

        return (
            <div className={styles.container}>
                <Meta meta={meta} />
                <div className={styles.content}>
                    <div className={styles.loginBox}>
                        <a className={styles.logoLink} href="/"><img className={styles.logo} src={require('../../assets/images/logo.png')}/></a>
                        <TextField className={styles.nameInputWrap} id="username" value={this.state.username} floatingLabelText={formatMessage(intlMsgs.nameInput)} onChange={this.onUserNameChange} disabled={this.state.submitting} />
                        <TextField className={styles.passInputWrap} id="password" value={this.state.password} floatingLabelText={formatMessage(intlMsgs.passInput)} onChange={this.onPassChange} disabled={this.state.submitting} />
                        <RaisedButton className={styles.submitBtn} label={formatMessage(intlMsgs.submitBtn)} primary={true} fullWidth={true} onClick={this.onSubmit} disabled={this.state.submitting || this.state.username.length < 5 || this.state.password.length < 6} />
                        <div className={styles.accountHelper}>
                            <a href="/register">{<FormattedMessage id="_RegisterNow" defaultMessage="Register Now"/>}</a>
                            <span> · </span>
                            <a href="/findpass">{<FormattedMessage id="_ForgotPassword" defaultMessage="Forgot Password?"/>}</a>
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Login))
