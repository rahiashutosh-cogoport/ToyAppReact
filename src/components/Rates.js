import React, { Component } from 'react';
import './Rates.css';
import Pagination from "react-js-pagination";
import Autosuggest from 'react-autosuggest';
import AutosuggestHighlightMatch from 'autosuggest-highlight/match';
import AutosuggestHighlightParse from 'autosuggest-highlight/parse';
import Tooltip from '@material-ui/core/Tooltip';

const containerTypes = [
    {
        display_name: 'standard'
    },
    {
        display_name: 'reefer'
    },
    {
        display_name: 'open_top'
    },
    {
        display_name: 'iso_tank'
    },
    {
        display_name: 'flat_rack'
    }
]

var shippingLines = {}

function getSuggestionValue(suggestion) {
    console.log("CALLED");
    return suggestion.display_name;
}
  
function renderSuggestion(suggestion, { query }) {
    console.log("RENDER SUGGESTION CALLED");
    const matches = AutosuggestHighlightMatch(suggestion.display_name, query);
    const parts = AutosuggestHighlightParse(suggestion.display_name, matches);
  
    return (
      <span>
        {parts.map((part, index) => {
          const className = part.highlight ? 'react-autosuggest__suggestion-match' : null;
  
          return (
            <span className={className} key={index}>
              {part.text}
            </span>
          );
        })}
      </span>
    );
}

function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

class Rates extends Component {
    constructor() {
        super();
        this.state = {
            loads: [],
            totalLoads: 0,
            totalPages: 0,
            origin_name: '',
            destination_name: '',
            selectedPage: 1,
            userLoggedIn: {},
            authenticatedUser: false,
            loadLoads: false,
            locationSuggestions: [],
            locationSuggestionCount: 0,
            originvalue: '',
            destvalue: '',
            conttypevalue: '',
            suggestions: [],
            contTypeSuggestions: [],            
            companyNames: []       
        };        
        this.handleUpload = this.handleUpload.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleOriginKeyUp = this.keyUpHandler.bind(this, 'reforiginportid');
        this.handleDestKeyUp = this.keyUpHandler.bind(this, 'refdestportid'); 
        this.getSuggestions = this.getSuggestions.bind(this);   
        this.getContTypeSuggestions = this.getContTypeSuggestions.bind(this); 
        // this.renderTooltip = this.renderTooltip.bind(this);        
    }

    getSuggestions(value) {
        var query = '?alphabet=' + value;
        fetch('http://localhost:3000/get_location_suggestions'+query, {
            method: 'GET',
            credentials : 'include'            
          }).then(
            response => {
              response.json().then((res) => {    
                this.setState({
                    suggestions: res.matches
                })            
              });
            }
        );
    }

    componentWillMount() {              
        fetch('http://localhost:3000/rates', {
            method: 'GET',
            credentials : 'include'            
          }).then(
            response => {
              response.json().then((res) => {    
                  if(res.message === 'Authenticated User') {
                      this.setState({
                          authenticatedUser: true
                      })
                  }               
              });
            }
          );
    }

    keyUpHandler(refName, event) {
        var getLocationSuggestionsUrl = 'http://localhost:3000/get_location_suggestions'
        var query = '?alphabet=' + event.target.value.toString();               
        if(event.target.value.length > 3) {            
            fetch(getLocationSuggestionsUrl + query, {
                method: 'GET',
                credentials : 'include',                
              }).then(
                response => {
                  response.json().then((res) => {                    
                    this.setState({
                      locationSuggestions: res.matches,
                      locationSuggestionCount: res.num_matches
                    });
                  });
                }
            );
            this.autocomplete(document.getElementById("originportid"));
        }
    }

    getContTypeSuggestions(value) {
        console.log("getContTypeSuggestions CALLED");        
        const escapedValue = escapeRegexCharacters(value.trim()); 
        console.log("ESCAPED VALUE: " + escapedValue);   
        if (escapedValue === '') {
          return [];
        }  
        const regex = new RegExp('^' + escapedValue, 'i');  
        console.log("REGEX: " + regex);
        console.log("CONTAINER TYPES:" + containerTypes);
        console.log(containerTypes.filter(conttype => regex.test(conttype.display_name)));
        return containerTypes.filter(conttype => regex.test(conttype.display_name));
    }
    
    handleUpload(event){    
        event.preventDefault();
        const data = new FormData(event.target);
        // var targetUrl = 'http://localhost:3000/rates';
        var targetUrl = 'http://localhost:3000/get_load_rates';
        var originportvalue = document.getElementById('originportid').value
        var destportvalue = document.getElementById('destportid').value
        var conttypevalue = document.getElementById('conttypeid').value
        var commodityvalue = document.getElementById('commodityid').value
        var contsizevalue = document.getElementById('contsizeid').value

        var query = '?originportname='+originportvalue.toString()+'&destportname='+destportvalue.toString()+'&commodity='+commodityvalue.toString()+'&conttype='+conttypevalue.toString()+'&contsize='+contsizevalue.toString();
        fetch(targetUrl+query, {
            method: 'GET',
            credentials : 'include'
          }).then(
            response => {
              response.json().then((res) => {    
                this.setState({
                  totalLoads: res.numLoads, // Total loads
                  totalPages: res.numPages, // Total pages
                  loads: res.loads, // Array of loads
                  origin_name: res.origin_name, // Name of the load origin port
                  destination_name: res.destination_name, // Name of the load destination port
                  userLoggedIn: res.user_logged_in, // Details of the logged in user
                  loadLoads: true,
                  companyNames: res.company_names
                });                
              });
            }
          );
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({selectedPage: pageNumber});
    }

    onOriginChange = (event, { newValue, method }) => {
        this.setState({
          originvalue: newValue
        });
    };

    onDestinationChange = (event, { newValue, method }) => {
        this.setState({
          destvalue: newValue
        });
    };

    onContTypeChange = (event, { newValue, method }) => {
        this.setState({
          conttypevalue: newValue
        });
    };
      
    onSuggestionsFetchRequested = ({ value }) => {
        if(value.length > 3) {
            this.getSuggestions(value)
        }
    };

    onContTypeSuggestionsFetchRequested = ({ value }) => {   
        this.setState({
            contTypeSuggestions: this.getContTypeSuggestions(value)
        });               
    };
    
    onSuggestionsClearRequested = () => {
        this.setState({
          suggestions: []
        });
    };

    // renderTooltip(index) {
    //     return(
    //         <Tooltip onClose={handleTooltipClose} onOpen={handleTooltipOpen} open={open} title="Add">
    //             SHEET TYPE: {this.state.loads[index]['sheet_type']}
    //         </Tooltip>
    //     )
    // }
    
    render() {
        if(!this.state.authenticatedUser) {
            return <div>Unauthenticated User</div>
        }
        const { originvalue, destvalue, suggestions, contTypeSuggestions, conttypevalue } = this.state;
        const inputOriginProps = {
            placeholder: "Enter Origin port name",
            id: "originportid",
            value: originvalue,
            onChange: this.onOriginChange
        };

        const inputDestinationProps = {
            placeholder: "Enter Origin port name",
            id: "destportid",
            value: destvalue,
            onChange: this.onDestinationChange
        };

        const contTypeProps = {
            placeholder: "Enter container type",
            value: conttypevalue,
            id: "conttypeid",
            onChange: this.onContTypeChange
        };

        return (
            <div>
                <form autoComplete="off" onSubmit={this.handleUpload}>
                    <div style={{marginTop: '70px', fontFamily: 'Poppins', color: 'grey', marginLeft: '38px', display: 'inline-block'}}>
                        <div className="autocomplete" style={{width: '270px'}}>
                        <Autosuggest 
                            suggestions={suggestions}
                            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                            getSuggestionValue={getSuggestionValue}
                            renderSuggestion={renderSuggestion}
                            inputProps={inputOriginProps}
                        />
                            {/* <input ref="reforiginportid" onKeyUp={this.handleOriginKeyUp} id="originportid" type="text" name="originport" placeholder="Origin Port" /> */}
                            {/* <input id="originportid" type="text" name="originport" placeholder="Origin Port" /> */}
                        </div>
                    </div>
                    
                    <div style={{marginTop: '70px', fontFamily: 'Poppins', color: 'grey', marginLeft: '10px', display: 'inline-block'}}>                
                        <div className="autocomplete" style={{width: '270px'}}>
                        <Autosuggest 
                            suggestions={suggestions}
                            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                            getSuggestionValue={getSuggestionValue}
                            renderSuggestion={renderSuggestion}
                            inputProps={inputDestinationProps}
                        />
                            {/* <input ref="refdestportid" onKeyUp={this.handleDestKeyUp} id="destportid" type="text" name="destport" placeholder="Destination Port" /> */}
                            {/* <input id="destportid" type="text" name="destport" placeholder="Destination Port" /> */}
                        </div>
                    </div>
                    <div style={{marginTop: '70px', fontFamily: 'Poppins', color: 'grey', marginLeft: '10px', display: 'inline-block'}}>
                        <Autosuggest 
                            suggestions={contTypeSuggestions}
                            onSuggestionsFetchRequested={this.onContTypeSuggestionsFetchRequested}
                            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                            getSuggestionValue={getSuggestionValue}
                            renderSuggestion={renderSuggestion}
                            inputProps={contTypeProps}
                        />
                        {/* <input value="standard" type="textbox" name="conttype" placeholder="Container Type" /> */}
                    </div>
                    <div style={{marginTop: '70px', fontFamily: 'Poppins', color: 'grey', marginLeft: '10px', display: 'inline-block'}}>        
                        <input id="commodityid" value="general" style={{width: '180px'}} type="textbox" name="commodity" placeholder="Commodity" />
                    </div>
                    <div style={{marginTop: '70px', fontFamily: 'Poppins', color: 'grey', marginLeft: '10px', display: 'inline-block'}}>
                        <label>Container Size </label>
                        <div style={{marginTop: '70px', marginLeft: '10px'}} className="styled-select slate">
                            <select id="contsizeid" name="contsize">
                                <option value="40HC">40HC</option>
                                <option value="40">40</option>
                                <option value="20HC">20HC</option>
                                <option value="20">20</option>
                            </select>
                        </div>
                    </div>
                    <div style={{fontFamily: 'Poppins', color: 'grey', marginTop: '40px', marginLeft: '10px', display: 'inline-block'}}>
                        <input id="submitBtn" type="submit" name="Submit" />
                    </div>
                    <div style={{width: '100%', marginTop: '20px', backgroundColor: 'white'}}>                        
                    </div>
                </form>
                
                {this.state.loads.length !== 0 || this.state.origin_name === '' ? this.state.loads.map((load, index)=>  
                    <div key={index.toString()} style={{fontSize: '15px', boxShadow: '10px 10px 5px grey', width: '95%', marginLeft: '34px', marginTop: '20px', marginBottom: index === this.state.totalLoads - 1 ? '100px' : '20px', backgroundColor: 'white', display: (index >= ((this.state.selectedPage-1)*10) && (index < (this.state.selectedPage*10))) ? 'block' : 'none'}}>
                        <div style={{marginBottom: '20px', position: 'relative', marginLeft: '78px', marginTop: '20px', fontFamily: 'Poppins', display: 'inline-block', color: 'grey'}}>
                            <i className="fas fa-map-marker-alt"></i> ORIGIN
                            <div style={{fontSize: '13px', position: 'relative', fontFamily: 'Poppins', color: 'black'}}>{this.state.origin_name}</div>
                        </div>

                        <div style={{marginBottom: '20px', position: 'relative', marginLeft: '78px', marginTop: '20px', fontFamily: 'Poppins', display: 'inline-block', color: 'grey'}}>
                            <i className="fas fa-map-marker-alt"></i> DESTINATION
                            <div style={{fontSize: '13px', position: 'relative', fontFamily: 'Poppins', color: 'black'}}>{this.state.destination_name}</div>
                        </div>

                        <div style={{marginBottom: '20px', position: 'relative', marginLeft: '78px', marginTop: '20px', fontFamily: 'Poppins', display: 'inline-block', color: 'grey'}}>
                            <i className="fas fa-dollar-sign"></i> PRICE
                            <div style={{fontSize: '13px', position: 'relative', fontFamily: 'Poppins', color: 'black'}}>{load['total_price']}</div>
                        </div>

                        <div style={{marginBottom: '20px', position: 'relative', marginLeft: '78px', marginTop: '20px', fontFamily: 'Poppins', display: 'inline-block', color: 'grey'}}>
                            <i className="far fa-clock"></i> STARTING DATE
                            <div style={{fontSize: '13px', position: 'relative', fontFamily: 'Poppins', color: 'black'}}>{load['start']}</div>
                        </div>

                        <div style={{marginBottom: '20px', position: 'relative', marginLeft: '78px', marginTop: '20px', fontFamily: 'Poppins', display: 'inline-block', color: 'grey'}}>
                            <i className="far fa-clock"></i> ENDING DATE
                            <div style={{fontSize: '13px', position: 'relative', fontFamily: 'Poppins', color: 'black'}}>{load['end']}</div>
                        </div>

                        <div style={{marginBottom: '20px', position: 'relative', marginLeft: '78px', marginTop: '20px', fontFamily: 'Poppins', display: 'inline-block', color: 'grey'}}>
                            <i className="fas fa-info-circle"></i>
                             DATE
                            <div style={{fontSize: '13px', position: 'relative', fontFamily: 'Poppins', color: 'black'}}>{load['date']}</div>
                        </div> 

                        <div style={{marginBottom: '20px', position: 'relative', marginLeft: '78px', marginTop: '20px', fontFamily: 'Poppins', display: 'inline-block', color: 'grey'}}>
                            <i className="fas fa-info-circle"></i>
                             MORE INFO
                            <div style={{fontSize: '13px', position: 'relative', fontFamily: 'Poppins', color: 'black'}}>Click here</div>
                        </div>

                        <div style={{marginBottom: '20px', position: 'relative', marginLeft: '78px', marginTop: '20px', fontFamily: 'Poppins', display: 'inline-block', color: 'grey'}}>
                            <i className="fas fa-info-circle"></i>
                             SHIPPING LINE
                            <div style={{fontSize: '13px', position: 'relative', fontFamily: 'Poppins', color: 'black'}}>{this.state.companyNames[index]}</div>
                        </div>    
                    </div>
                    ) : <center><div style={{fontFamily: 'Poppins', fontSize: '20px', color: 'grey', marginTop: '30px'}}>Sorry, no loads match your search</div></center>}
                    <center>
                        { this.state.loadLoads ? <Pagination
                        activePage={this.state.selectedPage}
                        itemsCountPerPage={10}
                        totalItemsCount={this.state.totalLoads}
                        pageRangeDisplayed={5}
                        onChange={this.handlePageChange}
                        style={{marginBottom: '90px'}}
                    /> : <div></div> }
                    
                    </center>
            </div>
          );
    }
}

export default Rates;
