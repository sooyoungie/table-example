import { TestBed, ComponentFixture } from '@angular/core/testing';
import { UserDetailsComponent } from './user-details.component';
import { UserService } from '../../core/user.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;
  let mockUserService: jasmine.SpyObj<UserService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: Router, useValue: mockRouter }
      ],
      imports: [RouterTestingModule, HttpClientTestingModule, UserDetailsComponent]
    })
    .compileComponents();

    mockUserService = jasmine.createSpyObj('UserService', ['getUserDetails']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch user details on initialization', () => {
    const userId = 1;
    const mockUser = { name: 'Test User', email: 'test@example.com', website: 'https://example.com' };
    mockUserService.getUserDetails.and.returnValue(of(mockUser));

    fixture.detectChanges();

    expect(mockUserService.getUserDetails).toHaveBeenCalledWith(userId);
    expect(component.user).toBe(mockUser);
  });

  it('should display loading state while fetching user details', () => {
    mockUserService.getUserDetails.and.returnValue(of(null));

    fixture.detectChanges();

    const loadingElement = fixture.debugElement.query(By.css('.user-details p')).nativeElement;
    expect(loadingElement.textContent).toBe('Loading...');
  });

  it('should navigate back to user list on back button click', () => {
    const button = fixture.debugElement.query(By.css('.back-btn')).nativeElement;
    button.click();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['user/user-list']);
  });
});

