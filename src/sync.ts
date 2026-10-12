import {supabase,supabaseConfigured} from "./supabase";
import {AppData} from "./store";

export type SyncResult = {data:AppData|null; error:string|null; source:"cloud"|"local"};
export async function loadOrSeedCloudState(userId:string,localData:AppData):Promise<SyncResult>{
 if(!supabaseConfigured||!supabase)return{data:null,error:"Supabase is not configured.",source:"local"};
 const read=await supabase.from("app_state").select("payload").eq("user_id",userId).maybeSingle();
 if(read.error)return{data:null,error:read.error.message,source:"local"};
 if(read.data?.payload)return{data:{...localData,...read.data.payload},error:null,source:"cloud"};
 const seed=await supabase.from("app_state").upsert({user_id:userId,payload:localData,updated_at:new Date().toISOString()});
 if(seed.error)return{data:null,error:seed.error.message,source:"local"};
 return{data:localData,error:null,source:"cloud"};
}
export async function saveCloudState(userId:string,data:AppData):Promise<string|null>{
 if(!supabaseConfigured||!supabase)return"Supabase is not configured.";
 const result=await supabase.from("app_state").upsert({user_id:userId,payload:data,updated_at:new Date().toISOString()},{onConflict:"user_id"});
 return result.error?.message||null;
}
