import { TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;
  let httpTestingController: HttpTestingController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    }).compileComponents().then(() => {
      userService = TestBed.inject(UserService);
      httpTestingController = TestBed.inject(HttpTestingController);
    });
  }));

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });

  it('should get a list of users', () => {
    const mockUsers = [{ id: 1, name: 'User1' }, { id: 2, name: 'User2' }];

    userService.getUsers().subscribe(users => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpTestingController.expectOne('https://jsonplaceholder.typicode.com/users');
    expect(req.request.method).toEqual('GET');
    req.flush(mockUsers);
  });

  it('should get user details', () => {
    const mockUserId = 1;
    const mockUserDetails = { id: 1, name: 'User1', email: 'user1@example.com' };

    userService.getUserDetails(mockUserId).subscribe(user => {
      expect(user).toEqual(mockUserDetails);
    });

    const req = httpTestingController.expectOne(`https://jsonplaceholder.typicode.com/users/${mockUserId}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockUserDetails);
  });
});
