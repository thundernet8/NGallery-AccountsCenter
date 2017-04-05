import { connect }                  from 'react-redux'
import React, { PropTypes }         from 'react'
import { Link }                     from 'react-router'
import ClassNames                   from 'classnames'
import * as styles                  from './style.scss'
import TextField                    from 'material-ui/TextField'
import RaisedButton                 from 'material-ui/RaisedButton'
import Meta                         from '../../components/meta'
import { FormattedMessage, injectIntl, defineMessages }         from 'react-intl'
import Validator                    from '../../utils/validator'
import Actions                      from '../../actions'
import popMessage                   from '../../components/popMessage'
import Spinner                      from '../../components/spinner'
import { getUrlQuery, addUrlQuery } from '../../utils/url'

const intlMsgs = defineMessages({
    nameInput: {
        id: '_UserName',
        defaultMessage: 'UserName'
    },
    emailInput: {
        id: '_Email',
        defaultMessage: 'Email'
    },
    passInput: {
        id: '_Password',
        defaultMessage: 'Password'
    },
    submitBtn: {
        id: '_Register',
        defaultMessage: 'Register'
    },
    registerSuccessMsg: {
        id: '_RegisterSuccess',
        defaultMessage: 'Register successfully, please check you mailbox and active your account'
    }
})

class Register extends React.Component {
    static propTypes = {
        username: PropTypes.string,
        email: PropTypes.string,
        password: PropTypes.string,
        submitting: PropTypes.bool
    }

    state = {
        username: '',
        email: '',
        password: '',
        submitting: false
    }

    judgeSubmitBtnActive = () => {
        return !this.state.submitting &&
        Validator.isValidUserName(this.state.username) &&
        Validator.isValidEmail(this.state.email) &&
        this.state.password.length >= 6
    }

    onUserNameChange = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    onEmailChange = (e) => {
        this.setState({
            email: e.target.value
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
        this.props.onRequestRegister(this.state.username, this.state.email, this.state.password)
        .then(user => {
            console.dir(user)
            popMessage.show('', this.props.intl.formatMessage(intlMsgs.registerSuccessMsg), 5)
            this.setState({
                username: '',
                email: '',
                password: '',
                submitting: false
            })
            setTimeout(() => {
                let to = '/signin'
                const redirect = getUrlQuery('_redirect')
                if (redirect) {
                    to = addUrlQuery(to, {_redirect: decodeURIComponent(redirect)})
                }
                location.href = to
            }, 3000)
        })
        .catch(err => {
            console.dir(err)
            popMessage.show('', err.message, 10)
            this.setState({
                submitting: false
            })
        })
    }

    showMessageBox = () => {

    }

    componentDidMount () {

    }

    componentWillUnmount () {

    }

    componentWillReceiveProps (nextProps) {

    }

    render () {
        const meta = {
            title: 'Sign Up',
            description: 'Sign up an account to explore'
        }

        const {formatMessage} = this.props.intl

        return (
            <div className={styles.container}>
                <Meta meta={meta} />
                {/* 禁止 Chrome 自动填充 */}
                <input style={{position: 'fixed', top: '-1000px'}} type="text" name="fakeusernameremembered"/>
                <input style={{position: 'fixed', top: '-1000px'}} type="password" name="fakepasswordremembered"/>
                <div className={styles.content}>
                    <div className={styles.registerBox}>
                        <a className={styles.logoLink} href="/"><img className={styles.logo} src={require('../../assets/images/logo.png')}/></a>
                        <TextField className={styles.nameInputWrap} id="username" value={this.state.username} floatingLabelText={formatMessage(intlMsgs.nameInput)} onChange={this.onUserNameChange} disabled={this.state.submitting} />
                        <TextField className={styles.emailInputWrap} id="email" value={this.state.email} floatingLabelText={formatMessage(intlMsgs.emailInput)} onChange={this.onEmailChange} disabled={this.state.submitting} />
                        <TextField type="password" className={styles.passInputWrap} id="password" value={this.state.password} floatingLabelText={formatMessage(intlMsgs.passInput)} onChange={this.onPassChange} disabled={this.state.submitting} />
                        <RaisedButton className={styles.submitBtn} label={!this.state.submitting ? formatMessage(intlMsgs.submitBtn) : ''} primary={true} fullWidth={true} onClick={this.onSubmit} disabled={!this.judgeSubmitBtnActive()}>{this.state.submitting && <Spinner thickness={2} size={25} style={{marginTop: 5}} />}</RaisedButton>
                        <div className={styles.accountHelper}>
                            {<FormattedMessage id="_HasAccount" defaultMessage="Has Account?"/>}
                            <span> · </span>
                            <Link to={`/signin${this.props.location.search}`}>{<FormattedMessage id="_LoginNow" defaultMessage="Login Right Now"/>}</Link>
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
        onRequestRegister: (username, email, password) => {
            return dispatch(Actions.requestRegister(username, email, password))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Register))
