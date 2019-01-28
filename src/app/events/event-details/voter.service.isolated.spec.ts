import {VoterService} from './voter.service';
import {ISession} from '../shared';
import {of} from "rxjs";

describe('VoterService', () => {
  let voterService: VoterService, mockHttp;

  beforeEach(() => {
    mockHttp = jasmine.createSpyObj('mockHttp', ['delete', 'post']);
    voterService = new VoterService(mockHttp);
  });

  describe('deleteVoter', () => {
    it('should remove the voter from the list of voters', () => {
      let session = {id: 3, voters: ['joe', 'john']};
      mockHttp.delete.and.returnValue(of(false)); //returns an observable of the value false

      voterService.deleteVoter(3, <ISession> session, 'joe');

      expect(session.voters.length).toBe(1);
      expect(session.voters[0]).toBe('john');
    });

    it('should call http.delete with the right URL', () => {
      let session = {id: 3, voters: ['joe', 'john']};
      mockHttp.delete.and.returnValue(of(false)); //returns an observable of the value false
      const url = `/api/events/3/sessions/3/voters/joe`;

      voterService.deleteVoter(3, <ISession> session, 'joe');

      expect(mockHttp.delete).toHaveBeenCalledWith(url);
    });

  });

  describe('addVoter', () => {
    it('should call http.post with the right URL', () => {
      let session = {id: 3, voters: ['john']};
      mockHttp.post.and.returnValue(of(false)); //returns an observable of the value false
      const url = `/api/events/3/sessions/3/voters/joe`;

      voterService.addVoter(3, <ISession> session, 'joe');

      expect(mockHttp.post).toHaveBeenCalledWith(url, {}, jasmine.any(Object));
    });
  });
});
