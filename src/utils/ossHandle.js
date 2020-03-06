import { IS_OSS } from "@/store/mutation-types"
/*...查看图片...*/
const showPicFromOss='http://gdnongxin.oss-cn-beijing.aliyuncs.com/';
const showPicFromLocal='/api/anadromous/agriculturalPro/show/';
const showCPicFromLocal='/api/anadromous/agriculturalPro/show/compression/';
/*......*/

/*...下载文件...*/
const dowFileToOss='/api/anadromous/agriculturalPro/downOssFile';
const dowFileToLocal='/api/anadromous/agriculturalPro/downFile';
/*......*/






//下载文件
export function getDowFile(file_path,file_name){
    // let is_oss= Vue.ls.get(IS_OSS);
    //let is_oss= true;
    if(IS_OSS){
        return dowFileToOss+'?fileUrl='+file_path+'&fileName='+file_name;
    }else{
        return dowFileToLocal+'?fileUrl='+file_path+'&fileName='+file_name;
    }
    
}
//查看图片
export function getViewImgUrl(pic_path){
    // let is_oss= Vue.ls.get(IS_OSS);
    //let is_oss= true;
    if(IS_OSS){
       return showPicFromOss+pic_path;
    }else{
        return showPicFromLocal+pic_path;
    }
}

export function getViewCompressionImgUrl(pic_path,ShaKuSun){
    // let is_oss= Vue.ls.get(IS_OSS);
    //let is_oss= true;
    if(IS_OSS){
       return showPicFromOss+pic_path+'?x-oss-process=image/resize,m_lfit,h_'+ShaKuSun+',w_'+ShaKuSun;
    }else{
        return showCPicFromLocal+pic_path+'/'+ShaKuSun+'/'+ShaKuSun;
    }
}