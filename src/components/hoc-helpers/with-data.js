import React, {Component} from 'react';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

const withData = (View) => {
    return class extends Component{
        state = {
            data: null,
            loading: true,
            error: false
        };

        componentDidUpdate(prevProps) {
            if (this.props.getData !== prevProps.getData){
                this.update()
            }
        }

        componentDidMount() {
           this.update();
        }

        update() {
            this.setState({
                loading: true,
                error: false
            });
        }

        this.props.getData()
            .then((data) => {
                this.setSate({
                    data,
                    loading: false
                });
            })
            .catch(() => {
                this.setState({
                    error: true,
                    loading: false
                });
            })w;
    }
    render() {
        const {data, loading, error} = this.state;
        if (!loading){
            return <Spinner />
        }
        if (error) {
            return <ErrorIndicator />
        }
        return <View {...this.props} data={data} />
    }
  }
}
export default withData;

/*
renderItems(arr) {
    return arr.map((item) => {
        const {id} = item;
        const label = this.props.children(item)
        return (
            <li className="list-group-item" key={person.id}
             onclick={() => this.propsOnItemSelected(person.id)}>{label}</li>
        )
    })
}
*/