import { connect }                  from 'react-redux'
import React, { PropTypes }         from 'react'
import ClassNames                   from 'classnames'
import * as styles                  from './style.scss'
import FormField                    from 'grommet/components/FormField'
import TextInput                    from 'grommet/components/TextInput'
import Button                       from 'grommet/components/Button'
import Spinning                     from 'grommet/components/icons/Spinning'
import PlatformSolarisIcon          from 'grommet/components/icons/base/PlatformSolaris'

class Register extends React.Component {
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
        return (
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.loginBox}>
                        <a className={styles.logoLink} href="/"><img className={styles.logo} src={require('../../assets/images/logo.png')}/></a>
                        <FormField className="mt20">
                            <TextInput id="username" value={this.state.username} placeHolder="Name or Email" onDOMChange={this.onUserNameChange} disabled={this.state.submitting} />
                        </FormField>
                        <FormField className="mt20">
                            <TextInput type="password" id="password" value={this.state.password} placeHolder="Password" onDOMChange={this.onPassChange} disabled={this.state.submitting} />
                        </FormField>
                        <Button className={styles.submitBtn} type="submit" size="small" icon={this.state.submitting ? <PlatformSolarisIcon className={ClassNames('animating', 'spin')}/> : null} label={this.state.submitting ? null : 'LOGIN'} onClick={this.onSubmit} primary={true} plain={false} accent={false} secondary={false} disabled={!this.state.submitting} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Register)
