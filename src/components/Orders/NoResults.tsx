import { Component } from "react";

class NoResults extends Component {
    render() {
        return (
            <div className="no-results">
                <div className="no-results__graphic">
                    <svg viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M10.5152 5.45455C7.16797 5.45455 4.45455 8.16797 4.45455 11.5152C4.45455 14.8623 7.16797 17.5758 10.5152 17.5758C13.8623 17.5758 16.5758 14.8623 16.5758 11.5152C16.5758 8.16797 13.8623 5.45455 10.5152 5.45455ZM3 11.5152C3 7.36465 6.36465 4 10.5152 4C14.6657 4 18.0303 7.36465 18.0303 11.5152C18.0303 13.3285 17.3881 14.9918 16.3186 16.2901L18.787 18.7585C19.071 19.0425 19.071 19.503 18.787 19.787C18.503 20.071 18.0425 20.071 17.7585 19.787L15.2901 17.3186C13.9918 18.3881 12.3285 19.0303 10.5152 19.0303C6.36465 19.0303 3 15.6657 3 11.5152Z" fill="#ccc"/>
                    </svg>
                </div>
                No results
            </div>
        )
    }
}

export default NoResults;