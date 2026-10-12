import {supabase,supabaseConfigured} from "./supabase";
import {AppData,initialData} from "./store";

export type SyncResult = {data:AppData|null; error:string|null; source:"cloud"|"local"};
export async function loadOrSeedCloudState(userId:string,localData:AppData):Promise<SyncResult>{
 if(!supabaseConfigured||!supabase)return{data:null,error:"Supabase is not configured.",source:"local"};
 const read=await supabase.from("app_state").select("payload").eq("user_id",userId).maybeSingle();
 if(read.error)return{data:null,error:read.error.message,source:"local"};
 if(read.data?.payload)return{data:{...localData,...read.data.payload},error:null,source:"cloud"};
 return{data:null,error:null,source:"local"};
