import { connect }                  from 'react-redux'
import React, { PropTypes }         from 'react'
import { Link }                     from 'react-router'
import ClassNames                   from 'classnames'
import * as styles                  from './style.scss'
import TextField                    from 'material-ui/TextField'
import RaisedButton                 from 'material-ui/RaisedButton'
import Meta                         from '../../components/meta'
import { FormattedMessage, injectIntl, defineMessages }         from 'react-intl'
import Actions                      from '../../actions'
import popMessage                   from '../../components/popMessage'
import Spinner                      from '../../components/spinner'
import Validator                    from '../../utils/validator'
import { getUrlQuery, addUrlQuery } from '../../utils/url'
import appConfig                    from '../../../config'
import reactCookie                  from 'react-cookie'
import { Base64 }                   from 'js-base64'

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
    },
    loginSuccessMsg: {
        id: '_LoginSuccess',
        defaultMessage: 'Login successfully, redirecting...'
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

    judgeSubmitBtnActive = () => {
        return !this.state.submitting &&
        (Validator.isValidUserName(this.state.username) || Validator.isValidEmail(this.state.username)) &&
        this.state.password.length >= 6
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
        this.props.onRequestLogin(this.state.username, this.state.password)
        .then(user => {
            console.dir(user)
            popMessage.show('', this.props.intl.formatMessage(intlMsgs.loginSuccessMsg), 2)
            this.setState({
                submitting: false
            })
            // 设置 token cookies
            reactCookie.save(appConfig.tokenCookie, user.accessToken, {httpOnly: false, domain: location.hostname, path: '/', expires: new Date(user.expires)})

            const redirect = getUrlQuery(appConfig.authRedirectKey)
            if (redirect) {
                let info = Base64.encode(JSON.stringify({token: user.accessToken, expires: user.expires}))
                location.href = addUrlQuery(decodeURIComponent(redirect), {[appConfig.authInfoKey]: info /* , _: (new Date()).getTime().toString() */})
            } else {
                location.href = '/'
            }
        })
        .catch(err => {
            console.dir(err)
            popMessage.show('', err.message, 5)
            this.setState({
                submitting: false
            })
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
            <div className={styles.bgContainer} style={{backgroundImage: `url(${require('../../assets/images/tunnel.jpg')})`}}>
            <div className={styles.container}>
                <Meta meta={meta} />
                {/* 禁止 Chrome 自动填充 */}
                <input style={{position: 'fixed', top: '-1000px'}} type="text" name="fakeusernameremembered"/>
                <input style={{position: 'fixed', top: '-1000px'}} type="password" name="fakepasswordremembered"/>
                <div className={styles.content}>
                    <div className={styles.loginBox}>
                        <a className={styles.logoLink} href="/"><img className={styles.logo} src={require('../../assets/images/logo.png')}/></a>
                        <TextField className={styles.nameInputWrap} id="username" value={this.state.username} floatingLabelText={formatMessage(intlMsgs.nameInput)} onChange={this.onUserNameChange} disabled={this.state.submitting} />
                        <TextField type="password" className={styles.passInputWrap} id="password" value={this.state.password} floatingLabelText={formatMessage(intlMsgs.passInput)} onChange={this.onPassChange} disabled={this.state.submitting} />
                        <RaisedButton className={styles.submitBtn} label={!this.state.submitting ? formatMessage(intlMsgs.submitBtn) : ''} primary={true} fullWidth={true} onClick={this.onSubmit} disabled={!this.judgeSubmitBtnActive()}>{this.state.submitting && <Spinner thickness={2} size={25} style={{marginTop: 5}} />}</RaisedButton>
                        <div className={styles.accountHelper}>
                            <Link to={`/signup${this.props.location.search}`}>{<FormattedMessage id="_RegisterNow" defaultMessage="Register Now"/>}</Link>
                            <span> · </span>
                            <Link to={`/findpass${this.props.location.search}`}>{<FormattedMessage id="_ForgotPassword" defaultMessage="Forgot Password?"/>}</Link>
                        </div>
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
    return {
        onRequestLogin: (username, password) => {
            return dispatch(Actions.requestLogin(username, password))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Login))
