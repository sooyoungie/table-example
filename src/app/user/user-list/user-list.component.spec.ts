import { TestBed, ComponentFixture } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { UserService } from '../../core/user.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let mockUserService: jasmine.SpyObj<UserService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: Router, useValue: mockRouter }
      ],
      imports: [RouterTestingModule, HttpClientTestingModule, UserListComponent]
    })
    .compileComponents();

    mockUserService = jasmine.createSpyObj('UserService', ['getUsers']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch users on initialization', () => {
    expect(mockUserService.getUsers).toHaveBeenCalled();
  });

  it('should navigate to user details on button click', () => {
    const userId = 1;
    const button = fixture.debugElement.query(By.css('.btn-detail')).nativeElement;
    button.click();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['user/user-details', userId]);
  });
});
