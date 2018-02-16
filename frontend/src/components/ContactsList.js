import React from 'react';
import FontAwesome from 'react-fontawesome';
import { SortColumns } from '../actions/ContactsActions';
import * as actions from '../actions/ContactsActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ContactsListItem } from './ContactsListItem';
import { ListTypes } from '../actions/ContactsActions';
import { Table } from 'reactstrap';
import Spinner from './Spinner';

class ContactsList extends React.Component {
    constructor() {
        super();
        this.state = {
            currentPage: 1,
            todosPerPage: 5
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }
    _sort(sortColumn) {
      this.props.actions.sortByColumn(sortColumn)
    }
    _sortHelper(columnToCheck) {
      if (this.props.sorting.column === columnToCheck)
        return <FontAwesome name={this.props.sorting.asc ? 'sort-asc' : 'sort-desc'} />;
    }

  renderRows(data) {
    debugger;
      const { currentPage, todosPerPage } = this.state;
      // Logic for displaying data
      const indexOfLastTodo = currentPage * todosPerPage;
      const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
      const currentTodos = data.slice(indexOfFirstTodo, indexOfLastTodo);

    if (currentTodos.length > 0) {
      return currentTodos.map((x, i) => <ContactsListItem
        key={i}
        data={x}
        editFunction={() => this.props.actions.toggleModal(x.id)}
        favoriteFunction={() => this.props.actions.toggleFavorite(x.id, this.props.favorites.filter(y => y.contactId === x.id)[0] || undefined)}
        isFavorite={this.props.favorites.filter(y => y.contactId === x.id).length > 0}
      />)
    } else {
      return <tr><td colSpan={5} className="text-center">There are no contacts in this list!</td></tr>
    }
  }

  fullTable() {
    debugger
    const { todosPerPage } = this.state;

    let data = this.props.searched ? this.props.searchedData : this.props.data;
    const mappedFavorites = this.props.favorites.map(y => y.contactId);

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(data.length / todosPerPage); i++) {
        pageNumbers.push(i);
    }
    const renderPageNumbers = pageNumbers.map(number => {
        return (
            <li
                key={number}
                id={number}
                onClick={this.handleClick}
            >
                {number}
            </li>
        );
    });

    switch (this.props.activeList) {
      case ListTypes.FAVORITES:
        data = data.filter(x => mappedFavorites.includes(x.id));
        break;
      default: break;
    }
      return (
        <div>
          <Table bordered id="customers">
        <thead>
          <tr>
            <th onClick={() => this._sort(SortColumns.ID)}>ID {this._sortHelper(SortColumns.ID)}</th>
            <th onClick={() => this._sort(SortColumns.NAME)}>Name {this._sortHelper(SortColumns.NAME)}</th>
            <th onClick={() => this._sort(SortColumns.LASTNAME)}>LastName {this._sortHelper(SortColumns.LASTNAME)}</th>
            <th onClick={() => this._sort(SortColumns.DOB)}>DOB {this._sortHelper(SortColumns.DOB)}</th>
            <th onClick={() => this._sort(SortColumns.PHONENUMBER)}>Phonenumber {this._sortHelper(SortColumns.PHONENUMBER)}</th>
            <th colSpan={2} className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {this.renderRows(data)}
        </tbody>
      </Table>
          <li id="page-numbers">
        {renderPageNumbers}
    </li>
          <br/>
          <br/>
        </div>
  );
  }

  componentWillMount() {
    debugger
    if (!this.props.fetching && !this.props.fetched)
      this.props.actions.getContacts();
  }

  render() {
    if (this.props.fetched) return this.fullTable();
    else if (this.props.error !== null) return <div><h1>There was a problem when making a request to get the contacts. Please refresh the page!</h1><br /> <p>{this.props.error}</p></div>;
    else return <Spinner />;
  }
};

const mapStateToProps = (state) => {
  return {
    data: state.contacts.data,
    sorting: state.contacts.sorting,
    modal: state.contacts.modal,
    favorites: state.contacts.favorites,
    activeList: state.contacts.activeList,
    searchedData: state.contacts.searchedData,
    searched: state.contacts.searched,
    fetching: state.contacts.fetching,
    fetched: state.contacts.fetched,
    error: state.contacts.error
  };
};

const mapDisptachToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(mapStateToProps, mapDisptachToProps)(ContactsList);