import React, { Component } from 'react';
import List from './List';

class FilteredList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search: "",
            type: "All",
            dropdownOpen: false
        };
    }

    onSearch = (event) => {
        this.setState({search: event.target.value.trim().toLowerCase()});
    }

    onFilter = (filterType) => {
        this.setState({
            type: filterType,
            dropdownOpen: false
        });
    }

    toggleDropdown = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    filterItem = (item) => {
        const matchesSearch = item.name.toLowerCase().search(this.state.search) !== -1;
        const matchesType = this.state.type === "All" || item.type === this.state.type;
        return matchesSearch && matchesType;
    }

    render(){
        return (
            <div className="filter-list">
                {/* Custom Dropdown */}
                <div style={{position: 'relative', marginBottom: '20px'}}>
                    <button 
                        onClick={this.toggleDropdown}
                        style={{
                            background: 'linear-gradient(45deg, #4facfe, #00f2fe)',
                            color: 'white',
                            border: 'none',
                            padding: '12px 20px',
                            borderRadius: '15px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            minWidth: '200px',
                            fontSize: '16px'
                        }}
                    >
                        Filter by: {this.state.type} ▼
                    </button>
                    
                    {this.state.dropdownOpen && (
                        <div 
                            style={{
                                position: 'absolute',
                                top: '100%',
                                left: '0',
                                background: 'white',
                                border: '1px solid #ddd',
                                borderRadius: '10px',
                                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                zIndex: 1000,
                                minWidth: '200px',
                                marginTop: '5px'
                            }}
                        >
                            <div 
                                onClick={() => this.onFilter("All")}
                                style={{
                                    padding: '12px 15px',
                                    cursor: 'pointer',
                                    borderBottom: '1px solid #eee',
                                    color: '#333',
                                    fontSize: '16px'
                                }}
                                onMouseEnter={(e) => e.target.style.background = '#f0f0f0'}
                                onMouseLeave={(e) => e.target.style.background = 'white'}
                            >
                                All
                            </div>
                            <div 
                                onClick={() => this.onFilter("Fruit")}
                                style={{
                                    padding: '12px 15px',
                                    cursor: 'pointer',
                                    borderBottom: '1px solid #eee',
                                    color: '#333',
                                    fontSize: '16px'
                                }}
                                onMouseEnter={(e) => e.target.style.background = '#f0f0f0'}
                                onMouseLeave={(e) => e.target.style.background = 'white'}
                            >
                                Fruit
                            </div>
                            <div 
                                onClick={() => this.onFilter("Vegetable")}
                                style={{
                                    padding: '12px 15px',
                                    cursor: 'pointer',
                                    color: '#333',
                                    fontSize: '16px'
                                }}
                                onMouseEnter={(e) => e.target.style.background = '#f0f0f0'}
                                onMouseLeave={(e) => e.target.style.background = 'white'}
                            >
                                Vegetable
                            </div>
                        </div>
                    )}
                </div>
                
                {/* Fixed Search Input - THIS IS THE KEY FIX */}
                <input 
                    type="text" 
                    placeholder="Search for produce..." 
                    value={this.state.search}
                    onChange={this.onSearch}
                    style={{
                        width: '100%',
                        padding: '12px 20px',
                        margin: '20px 0',
                        border: 'none',
                        borderRadius: '25px',
                        background: 'rgba(255, 255, 255, 0.9)',
                        fontSize: '16px',
                        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
                        color: '#333',
                        outline: 'none'
                    }}
                />
                
                <List items={this.props.items.filter(this.filterItem)} />
            </div>
        );
    }
}

export default FilteredList;