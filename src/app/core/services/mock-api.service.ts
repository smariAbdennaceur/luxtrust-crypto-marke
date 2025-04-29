import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Position } from '../models/position.model';


@Injectable({ providedIn: 'root' })
export class MockApiService {
  private users: User[] = [];
  private currentUser: User | null = null;

  private positions$ = new BehaviorSubject<Position[]>([]);
  private positionIdCounter = 1;

  register(user: User): Observable<boolean> {
    const exists = this.users.some(u => u.username === user.username);
    if (exists) return of(false);
    this.users.push({ ...user });
    return of(true);
  }

  login(username: string): Observable<boolean> {
    const user = this.users.find(u => u.username === username);
    if (user) {
      this.currentUser = user;
      return of(true);
    }
    return of(false);
  }

  getCurrentUser(): Observable<User | null> {
    return of(this.currentUser);
  }

  getUserByUsername(username: string): Observable<User | null> {
    if (this.currentUser?.role !== 'ADMINISTRATOR') return of(null);
    return of(this.users.find(u => u.username === username) || null);
  }

  addSellPosition(position: Omit<Position, 'id' | 'status' | 'owner'>): Observable<Position> {
    if (!this.currentUser) return of(null as any);
    const newPosition: Position = {
      ...position,
      id: this.positionIdCounter++,
      status: 'OPEN',
      owner: this.currentUser.username
    };
    this.positions$.next([...this.positions$.value, newPosition]);
    return of(newPosition);
  }

  getPositionById(id: number): Observable<Position | undefined> {
    return this.positions$.pipe(map(positions => positions.find(p => p.id === id)));
  }

  buyPosition(id: number): Observable<boolean> {
    if (!this.currentUser) return of(false);
    const positions = this.positions$.value;
    const index = positions.findIndex(p => p.id === id && p.status === 'OPEN');
    if (index === -1) return of(false);

    positions[index] = { ...positions[index], status: 'SOLD' };
    this.positions$.next([...positions]);
    return of(true);
  }

  deletePosition(id: number): Observable<boolean> {
    if (!this.currentUser) return of(false);
    const position = this.positions$.value.find(p => p.id === id);
    if (!position) return of(false);

    const isOwner = position.owner === this.currentUser.username;
    const isAdmin = this.currentUser.role === 'ADMINISTRATOR';
    if (!isOwner && !isAdmin) return of(false);

    this.positions$.next(this.positions$.value.filter(p => p.id !== id));
    return of(true);
  }

  getAllPositions(): Observable<Position[]> {
    return this.positions$.asObservable();
  }
}
