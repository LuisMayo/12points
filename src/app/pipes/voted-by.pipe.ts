import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'votedBy'
})
export class VotedByPipe implements PipeTransform {

  // Args[0] being theusers array, args[1] whether it should be extended or not
  transform(contestant, ...args: any[][]): string {
    const findVoteFunction = vote => vote.contestant.id === contestant.id;
    const users: any[] = args[0].filter(user => user.votes.find(findVoteFunction) != null);
    console.log(users);
    users.sort((a, b) => b.votes.find(findVoteFunction).points - a.votes.find(findVoteFunction).points);
    const shownUsers = args[1] ? users : users.slice(0, 3);
    // Create the voted by text. If nobody voted it, it's an special text. Else we concat the usernames + votes using the reduce function
    const showField =  shownUsers.length === 0 ? 'No votes' : shownUsers.reduce((prev, user, index, arr) => {
      // Is it the last name?, If it is, did we left somwone behind?
      const chunkEnd = index === arr.length - 1 ? (shownUsers.length === users.length ? '' : ' and more') : ', ';
      return `${prev}${user.username} (${user.votes.find(findVoteFunction).points})${chunkEnd}`;
    }, 'Voted by ');
    return showField;
  }

}
