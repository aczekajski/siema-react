import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Siema from '../lib/siema-react';
import styled from 'styled-components';

const BigSlider = styled(Siema) `
    width: 400px;

    img {
        width: 100%;
    }
`;

const SmallSlider = styled(Siema) `
    width: 100px;
    margin: 0 150px;

    div {

        img {
            width: 100%;
        }
    }
`;

const TripleSlider = styled(Siema) `
    width:300px;

    img {
        width: 100px;
    }
`;

const SmallSliderWrapper = styled.div`
    width: 400px;
    overflow: hidden;
    position: relative;

    &:before, &:after {
        content: '';
        position: absolute;
        width: 50px;
        height: 43px;
        pointer-events: none
    }
    &:before {
        background: linear-gradient(to right, rgba(255,255,255,1) 0%,rgba(255,255,255,0) 100%);
        left: 0;
        top: 0;
        z-index: 10;
    }
    &:after {
        background: linear-gradient(to right, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 100%);
        right: 0;
        top: 0;
        z-index: 10;
    }
`;

const ExampleChildren = ({ img }: { img: any; }) => <div><img src={img} alt="Siema image" /></div>;

class App extends React.Component {
    public state = {
        current: 0,
    };

    private getSmallSliderRef = (element) => { this.smallSlider = element; };
    private getBigSliderRef = (element) => { this.bigSlider = element; };

    private smallSlider;
    private bigSlider;

    render() {

        const { current } = this.state;

        return (
            <div>
                No siema ;)
                <BigSlider clickable={true} overflowHidden={false}>
                    <ExampleChildren img={'one'} />
                    <ExampleChildren img={'two'} />
                </BigSlider>
                <BigSlider>
                    <div><img src="http://via.placeholder.com/350x150/FFC0CB?text=1" alt="Siema image" /></div>
                    <div><img src="http://via.placeholder.com/350x150/ADD8E6?text=2" alt="Siema image" /></div>
                    <div><img src="http://via.placeholder.com/350x150/FFC0CB?text=3" alt="Siema image" /></div>
                    <div><img src="http://via.placeholder.com/350x150/ADD8E6?text=4" alt="Siema image" /></div>
                    <div><img src="http://via.placeholder.com/350x150/FFC0CB?text=5" alt="Siema image" /></div>
                    <div><img src="http://via.placeholder.com/350x150/ADD8E6?text=6" alt="Siema image" /></div>
                    <div><img src="http://via.placeholder.com/350x150/FFC0CB?text=7" alt="Siema image" /></div>
                    <div><img src="http://via.placeholder.com/350x150/ADD8E6?text=8" alt="Siema image" /></div>
                    <div><img src="http://via.placeholder.com/350x150/FFC0CB?text=9" alt="Siema image" /></div>
                </BigSlider>
                <SmallSliderWrapper>
                    <SmallSlider overflowHidden={false}>
                        <div><img src="http://via.placeholder.com/350x150/FFC0CB?text=1" alt="Siema image" /></div>
                        <div><img src="http://via.placeholder.com/350x150/ADD8E6?text=2" alt="Siema image" /></div>
                        <div><img src="http://via.placeholder.com/350x150/FFC0CB?text=3" alt="Siema image" /></div>
                        <div><img src="http://via.placeholder.com/350x150/ADD8E6?text=4" alt="Siema image" /></div>
                        <div><img src="http://via.placeholder.com/350x150/FFC0CB?text=5" alt="Siema image" /></div>
                        <div><img src="http://via.placeholder.com/350x150/ADD8E6?text=6" alt="Siema image" /></div>
                        <div><img src="http://via.placeholder.com/350x150/FFC0CB?text=7" alt="Siema image" /></div>
                        <div><img src="http://via.placeholder.com/350x150/ADD8E6?text=8" alt="Siema image" /></div>
                        <div><img src="http://via.placeholder.com/350x150/FFC0CB?text=9" alt="Siema image" /></div>
                    </SmallSlider>
                </SmallSliderWrapper>
                <TripleSlider perPage={3} clickable={true} preventClickOnDrag={true}>
                    <div><img src="http://via.placeholder.com/350x150/FFC0CB?text=1" alt="Siema image" /></div>
                    <div><img src="http://via.placeholder.com/350x150/ADD8E6?text=2" alt="Siema image" /></div>
                    <div><img src="http://via.placeholder.com/350x150/FFC0CB?text=3" alt="Siema image" /></div>
                    <div><img src="http://via.placeholder.com/350x150/ADD8E6?text=4" alt="Siema image" /></div>
                    <div><img src="http://via.placeholder.com/350x150/FFC0CB?text=5" alt="Siema image" /></div>
                    <div><img src="http://via.placeholder.com/350x150/ADD8E6?text=6" alt="Siema image" /></div>
                    <div><img src="http://via.placeholder.com/350x150/FFC0CB?text=7" alt="Siema image" /></div>
                    <div><img src="http://via.placeholder.com/350x150/ADD8E6?text=8" alt="Siema image" /></div>
                    <div><img src="http://via.placeholder.com/350x150/FFC0CB?text=9" alt="Siema image" /></div>
                </TripleSlider>
                <hr style={{ clear: 'both' }} />
                <button onClick={() => { this.bigSlider.prev(); this.setState({ current: 0 }) }}>prev</button>
                <button onClick={() => { this.bigSlider.next(); this.setState({ current: 1 }) }}>next</button>
                <BigSlider duration={100} innerRef={this.getBigSliderRef} onChange={(index: number) => { this.smallSlider.goTo(index); }}>
                    <div><img src="http://via.placeholder.com/350x150/FFC0CB?text=1" alt="Siema image" /></div>
                    <div><img src="http://via.placeholder.com/350x150/ADD8E6?text=2" alt="Siema image" /></div>
                    <div><img src="http://via.placeholder.com/350x150/FFC0CB?text=3" alt="Siema image" /></div>
                    <div><img src="http://via.placeholder.com/350x150/ADD8E6?text=4" alt="Siema image" /></div>
                    <div><img src="http://via.placeholder.com/350x150/FFC0CB?text=5" alt="Siema image" /></div>
                    <div><img src="http://via.placeholder.com/350x150/ADD8E6?text=6" alt="Siema image" /></div>
                    <div><img src="http://via.placeholder.com/350x150/FFC0CB?text=7" alt="Siema image" /></div>
                    <div><img src="http://via.placeholder.com/350x150/ADD8E6?text=8" alt="Siema image" /></div>
                    <div><img src="http://via.placeholder.com/350x150/FFC0CB?text=9" alt="Siema image" /></div>
                </BigSlider>
                <SmallSliderWrapper>
                    <SmallSlider duration={100} innerRef={this.getSmallSliderRef} onChange={(index: number) => { this.bigSlider.goTo(index); this.setState({ current: index }) }} overflowHidden={false} clickable={false}>
                        <div style={{ border: current === 0 ? '1px solid red' : '1px solid green' }}><img src="http://via.placeholder.com/350x150/FFC0CB?text=1" alt="Siema image" /></div>
                        <div style={{ border: current === 1 ? '1px solid red' : '1px solid green' }}><img src="http://via.placeholder.com/350x150/ADD8E6?text=2" alt="Siema image" /></div>
                        <div style={{ border: current === 2 ? '1px solid red' : '1px solid green' }}><img src="http://via.placeholder.com/350x150/FFC0CB?text=3" alt="Siema image" /></div>
                        <div><img src="http://via.placeholder.com/350x150/ADD8E6?text=4" alt="Siema image" /></div>
                        <div><img src="http://via.placeholder.com/350x150/FFC0CB?text=5" alt="Siema image" /></div>
                        <div><img src="http://via.placeholder.com/350x150/ADD8E6?text=6" alt="Siema image" /></div>
                        <div><img src="http://via.placeholder.com/350x150/FFC0CB?text=7" alt="Siema image" /></div>
                        <div><img src="http://via.placeholder.com/350x150/ADD8E6?text=8" alt="Siema image" /></div>
                        <div><img src="http://via.placeholder.com/350x150/FFC0CB?text=9" alt="Siema image" /></div>
                    </SmallSlider>
                </SmallSliderWrapper>
            </div>
        );
    }
}

const renderApp = () => {
    ReactDOM.render(
        <App />
        ,
        document.getElementById('app'),
    );
};

renderApp();
