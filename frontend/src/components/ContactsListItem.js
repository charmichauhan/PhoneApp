import React from 'react';
import FontAwesome from 'react-fontawesome';

export class ContactsListItem extends React.Component {

  render() {
      debugger;
      console.log('this.props.data',this.props.data);
      console.log('this.props.data.id',this.props.data.id);
    return (
      <tr>
          <td>{this.props.data.id }</td>
          <td>{this.props.data.name}</td>
          <td>{this.props.data.lastname}</td>
          <td>{this.props.data.DOB}</td>
          <td>{this.props.data.phonenumber}</td>
          <td onClick={this.props.editFunction} className="text-center action"><FontAwesome name='pencil'/></td>
          <td onClick={this.props.favoriteFunction} className="text-center action"><FontAwesome name={this.props.isFavorite ? 'star' : 'star-o'}/></td>
      </tr>
    )
  }
}
