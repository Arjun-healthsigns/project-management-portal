export type Status = 'Not Started' | 'In Progress' | 'On Hold' | 'Completed';
export type Priority = 'High' | 'Medium' | 'Low';
export type TaskStatus = 'To Do' | 'In Progress' | 'Completed' | 'Blocked';
export interface Member { id:string; name:string; email:string; phone:string; title:string; department:string; joined:string; active:boolean }
export interface Project { id:string; name:string; description:string; client:string; start:string; end:string; managerId:string; memberIds:string[]; priority:Priority; status:Status; created:string; updated:string }
export interface Task { id:string; projectId:string; name:string; description:string; assigneeId:string; priority:Priority; start:string; due:string; status:TaskStatus; created:string; updated:string }
export interface Activity { id:string; text:string; projectId:string; user:string; date:string }
export interface DB { projects:Project[]; members:Member[]; tasks:Task[]; activities:Activity[] }
