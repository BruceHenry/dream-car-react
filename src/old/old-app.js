class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: ['Mercedes', 'Lexus', 'Porsche']
        }
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleRandom = this.handleRandom.bind(this);
        this.deleteOption = this.deleteOption.bind(this);
    }

    componentDidMount() {
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);
            if (options) {
                this.setState(() => ({ options: options }));
            }
        } catch (e) {
            return;
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
        }
    }

    handleAddOption(option) {
        if (!option)
            return 'Cannot be empty';
        if (this.state.options.indexOf(option) != -1)
            return 'Already Exist!';
        this.setState((prevState) => ({ options: prevState.options.concat(option) })
        )
    }

    handleClear() {
        this.setState(() => ({ options: [] }))
    }

    handleRandom() {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        alert(this.state.options[randomNum]);
    }

    deleteOption(optionToDelete) {
        this.setState((prevState) => ({ options: prevState.options.filter((option) => option !== optionToDelete) }));
    }

    render() {
        return (
            <div>
                <Header />
                <Options options={this.state.options} deleteOption={this.deleteOption} />
                <Edit
                    handleAddOption={this.handleAddOption}
                    handleClear={this.handleClear}
                    handleRandom={this.handleRandom}
                />
            </div>
        );
    }
}

const Header = () => (<h1>React</h1>);

// class Header extends React.Component {
//     render() {
//         return (<h1>React</h1>)
//     }
// }


const Options = (props) => (
    <div>
        {
            props.options.map((option) => (<Option key={option} text={option} deleteOption={props.deleteOption} />))
        }
    </div>
);

// class Options extends React.Component {
//     render() {
//         return (
//             <div>
//                 {
//                     this.props.options.map((option) => (<Option key={option} text={option} />))
//                 }
//             </div>
//         )
//     }

// }

const Option = (props) => (
    <div>
        <li>{props.text} <button onClick={(e) => { props.deleteOption(props.text) }}>Remove</button></li>
    </div>
);

// class Option extends React.Component {
//     render() {
//         return (
//             <li>{this.props.text}</li>
//         )
//     }
// }

class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleRandom = this.handleRandom.bind(this);
        this.state = {
            msg: undefined
        }
    }
    handleAddOption(e) {
        e.preventDefault();
        const option = e.target.elements.option.value;
        const error = this.props.handleAddOption(option);
        console.log(error)
        this.setState(() => ({ msg: error }))
        e.target.elements.option.value = '';
    }
    handleClear() {
        this.props.handleClear();
    }
    handleRandom() {
        this.props.handleRandom();
    }
    render() {
        return (
            <div>
                <button onClick={this.handleRandom}>Random Choose One</button>
                <button onClick={this.handleClear}>Clear</button>
                <form onSubmit={this.handleAddOption}>
                    <input type="text" name="option" />
                    <button>Add Option</button>
                </form>
                {this.state.msg && <b>{this.state.msg}</b>}
            </div>
        )
    }
}