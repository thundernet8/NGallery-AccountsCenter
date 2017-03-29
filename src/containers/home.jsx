import { connect }                  from 'react-redux'
import React, { PropTypes }         from 'react'

class Home extends React.Component {
    componentDidMount () {

    }

    componentWillUnmount () {

    }

    componentWillReceiveProps (nextProps) {

    }

    render () {
        return (
        <div>
            {this.props.children}
        </div>
        )
    }
}

// Redux connection
const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

// Which props to inject from the global atomic state
export default connect(mapStateToProps, mapDispatchToProps)(Home)
