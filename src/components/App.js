import React from 'react'
import Header from './Header'
import Options from './Options'
import Edit from './Edit'
import OptionModal from './OptionModal';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: ['Mercedes AMG GT', 'Lexus LC', 'Porsche 911'],
            selectedOption: undefined
        }
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleClearRandom = this.handleClearRandom.bind(this);
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

    handleClearRandom() {
        this.setState(() => ({
            selectedOption: undefined
        }));
    }

    handleRandom() {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];
        this.setState(() => ({
            selectedOption: option
        }));
    }

    deleteOption(optionToDelete) {
        this.setState((prevState) => ({ options: prevState.options.filter((option) => option !== optionToDelete) }));
    }

    render() {
        return (
            <div>
                <Header />
                <div className="container">
                    <Options options={this.state.options} deleteOption={this.deleteOption} />
                    <Edit
                        handleAddOption={this.handleAddOption}
                        handleClear={this.handleClear}
                        handleRandom={this.handleRandom}
                        hasOptions={this.state.options.length > 0}
                    />
                </div>
                <OptionModal
                    selectedOption={this.state.selectedOption}
                    handleClearRandom={this.handleClearRandom}
                />
            </div>
        );
    }
}