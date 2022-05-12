import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'votedBy'
})
export class VotedByPipe implements PipeTransform {

  transform(contestant, ...args: any[][]): string {
    const users: any[] = args[0].filter(user => user.votes.find(vote => vote.contestant.id === contestant.id) != null);
    console.log(users);
    const usersFiltered = users.slice(0, 15);
    // Create the voted by text. If nobody voted it, it's an special text. Else we concat the use rnames + votes using the reduce function
    const showField =  usersFiltered.length === 0 ? 'No votes' : usersFiltered.reduce((prev, user, index, arr) => {
      // Is it the last name?
      const chunkEnd = index === arr.length - 1 ? '' : ', ';
      return `${prev}${user.username} (${user.votes.find(vote => vote.contestant.id === contestant.id).points})${chunkEnd}`;
    }, 'Voted by ');
    return showField;
  }

}
