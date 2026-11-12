import {createContext,useContext,useEffect,useMemo,useReducer} from 'react';
import type {DB,Project,Task,Member} from './types';import {seedData} from './data';
const KEY='projecthub-db-v1';
function load():DB {try{const saved=localStorage.getItem(KEY);if(saved)return JSON.parse(saved) as DB;}catch{localStorage.removeItem(KEY)}return seedData}
type Action={type:'project/save';value:Project}|{type:'project/delete';id:string}|{type:'task/save';value:Task}|{type:'task/delete';id:string}|{type:'member/save';value:Member};
function reducer(s:DB,a:Action):DB {switch(a.type){case'project/save':return {...s,projects:s.projects.some(x=>x.id===a.value.id)?s.projects.map(x=>x.id===a.value.id?a.value:x):[a.value,...s.projects]};case'project/delete':return {...s,projects:s.projects.filter(x=>x.id!==a.id),tasks:s.tasks.filter(x=>x.projectId!==a.id),activities:s.activities.filter(x=>x.projectId!==a.id)};case'task/save':return {...s,tasks:s.tasks.some(x=>x.id===a.value.id)?s.tasks.map(x=>x.id===a.value.id?a.value:x):[a.value,...s.tasks]};case'task/delete':return {...s,tasks:s.tasks.filter(x=>x.id!==a.id)};case'member/save':return {...s,members:s.members.some(x=>x.id===a.value.id)?s.members.map(x=>x.id===a.value.id?a.value:x):[a.value,...s.members]}}}
const C=createContext<{db:DB;dispatch:(a:Action)=>void}|null>(null);
export function AppProvider({children}:{children:React.ReactNode}){const [db,dispatch]=useReducer(reducer,undefined,load);useEffect(()=>{localStorage.setItem(KEY,JSON.stringify(db))},[db]);const value=useMemo(()=>({db,dispatch}),[db]);return <C.Provider value={value}>{children}</C.Provider>}
export function useApp(){const c=useContext(C);if(!c)throw Error('useApp must be used within AppProvider');return c}
