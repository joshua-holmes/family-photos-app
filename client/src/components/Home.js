import Detail from "./Detail";
import Filter from "./Filter";
import { useEffect, useState } from "react";



function Home() {
    const [selectedData, setSelectedData] = useState({})
    const [data, setData] = useState({})
    const stringifyDate = date => {
        const y = String(date.getFullYear())
        const m = String(date.getMonth() + 1)
        const d = String(date.getDate())
        return `${y}-${m.length < 2 ? '0' + m : m}-${d.length < 2 ? '0' + d : d}`
    }

    useEffect(() => {
        const photos = [{'id': 'AHNRPkcbfwaFhqU-3l1_C7s2SVkZsk26tyub-0iNWJR8MI8hWPC7vv7hyjo1mgNdsMZqQ83axX25_N7gZA-7pBkgcFRo63CruA', 'baseUrl': 'https://lh3.googleusercontent.com/lr/AFBm1_YIzNt4dr4qOLpfBzdpZVvRJLjj2WSM-eAGw1g3ffIS2LS0CrTxVjoFTxoGTwCXHyk2C5qVDYQ3noQhE73aSDcXSpBrnA_Ov-S62nW1wITNTnRJ3_o91NAIeyLQLGIt518c-XXt0h6VE2Je_bWSeWvwWKHj0EtIpjlkkdMDLHw52AjwuSloTWXNW4fMt13i66TFlNGWae-f0Bpd2bu6BsAO8UucEKcoI0hX4virA4EBYkYVZz4eNkP1LJu3VbH-Fo4_-pELM0K56RY5B3ZnTQRIMQl-BYYSLCVC_hsYmrNjha3kq_UyM3zh3Rc0BnabENzYzGh8Mnus6locByjO3NRqziBNRuNCiv7B79X_XxVwwDygRfTwYgJjVkpkWs_MuO7ZTMRBcW2Ux9N-poExstkefh03HjNKMb1LBeEUc0K83b39l1RKS_0vqk4e6doEngQOLAAJrwRw_YqaYYqDDvW1ArTU0uw5R7D8dlknysWR_Br48FLDnQxcHjdSuxBwXe5K1heoqcX5UQ2NKkzHtODon3hang28mSdh0arPzmlAS0J5ceKwILffEPlmBnsc2iXlnj3U4FCL8TXOcZEkOxmyY6YnTVdypU7onoHVSO-uplIc4DEfVdxXeJT-DaQIEN2YiamB7XJcjlwhRfLuYitmkC9OdKCEa9a4sohLndKDGcZ1is6GyFqFaXEG7sAroUF9EGUODSqI2IaYVyDcA4D3FhvgSCk7m2pD0C5RWkxf8oPQp9Vtkw0VXTgUfbgd8r3ksSso4_36dIy79LPk2Pc_TRTfO3lJXsCtpSPOETajC-QWbxqiKZqHUpdOAw_0TWVn62IwlVxs', 'creationTime': '2021-11-10T05:28:28Z', 'width': 3024, 'height': 4032}, {'id': 'AHNRPkeZM7HaJey1M-R6hmkpkrKLDqv2YABV2eBLd94Rxqhad3HfbzfqSrNphoUo7JZC9JlUGMxtpJRcjCcwlMG1K20uzFTWRw', 'baseUrl': 'https://lh3.googleusercontent.com/lr/AFBm1_ax6JKA_LhA1g9qjX66CCvTBc3hPqC8QTdYoLKJrlAGgBZU99Mu_1wFvG-uspqJpIh5BuBWLioV82CJoDmp18mQGSFa6JDUIgjf3ETvLBNuxR5T08e9B0HUZDKFDV5x9vo1AcS7H6PNLHMTlqItR5-E4YUs7500KGPWMhkp9SfK5m5Pd3N9cSN44ruTYNkcNPnBncjcnY6Bf8l95fxzT-MnH_lgjIQmezJtieW0PlKDTic_lwFBxDxvtQG-2x3CWJsqURLKKU2l_OCW2WenCAkLBaf9v_eYjCM98nnNYrtuAcBbCxllL3OQEJGVWuqROdmDRVao4arCtVO8cYeV7UrJNI9Bpjwhbh5EyVYIHkYTWOlKOi_p6r6jDWeNcCGqj6qiI_uJxfnoJ05-eGOOA3AjSy6PYvIMp9gxZ3BtWe5MplOz5KahDYqKTzRv1DzAi3pbu0t4EC9Lu3OxqQKa_7kGLxAGaYeSbsyj87sbgAeIMF2FoNTfaPf-0l7SQFb3uWVI6njOIOqws7Fz6tMX6aLzchyaFb4uLYFRhyWTcbMdq-UmRKoBVvRXv57522wCzse9mS0AdFJxGoTxfc4W7qWtxjv2m-rdW3uxFA4XNYJVypoCTKT1PVQWB-_JrY3elu1Sv-Y4PTB7nebFy2OZmG1paDd0_qT16n7rXf727m7AesNzBbDEJKvKZeNeJuaoFeT8D11p-JDWJ6dNV8a0pvK0CtAzQd0zTaPTMg-t55vFSgBoBOK7p-B1ojCxB2vNzQzHCAjTi0PJQJ2BRXsOORzwh06qnVWzSag_quDHj_jSU4Wu8MWwXxDFIh23gdF1Z4RIHFGezZdb', 'creationTime': '2021-11-10T05:29:58Z', 'width': 3024, 'height': 4032}, {'id': 'AHNRPkc365HSpruWF-EqWi9TzCz_aOL750Q9HMbQ4UGaMCjBoYhJb12uNYdABxoRfBgktC4jBcbuAE46M9rWFrE0CbxKKbZoNA', 'baseUrl': 'https://lh3.googleusercontent.com/lr/AFBm1_b8vooReVPrmjnr8oU5ZrgEnLYbN3IlzSP7VXkbCJYZVRG1ry4_WHntBAy0rBr8Wd9LI57S4uePC03zuJih08ODg2hoj_jT6VTqxBop8muqd-8J0JCrWs4Lzb1vhTC6P6nd10UHsh2klVb3fZ5IUy7oDg6hyOhJLTtAFwTnxqzxYWK1kiAu0Q088V2uCXD7EmzkSTYbrBX0DFh4VSHI_2-wP4OE4QWhOYtNOctXDNaQ_kwPtGNGORnJVXHPMpm8BA1ZSivm_T-nIYNIlW_-swBrCFYLtj4o4_wkLYMCYFxkGTVD3UtGAlxTc7T-dT7UPWi3cVOdiZjJqBNmmwGTo26iGUaAxd4DTDKz8HIN8QyQZMYo88vMWtW25jW5A7XSTx06AFo1QGBxXMAOj3KdkCQ5iRvwawWuATZ5WtL7PlxDSPlYYyjN1gPYfMjtkyiNLfAGvzPNWQHDv2ER3xdpsttI41U4y08LtcchbA78FIvDp-Iof2fLRTqOfeLi7dJD-5HYxb95-dTqcxCfCbCSLAFH6Z94WaV-hzcFtF1rp4OkJXKBt6DHbkx24k5LdRrykD9gIq5cjFiJfCoFgvlG5RcAk4dIffi1Q6qYXppwCmZXwME4zGnjgDPj1AmCa9gMoszwI7qNSTJGfQr7iWwm1yUri_Ii6LdWmuLi9DGKran8qUuYIU19x-PitfrqlBwSLqbynMSYntPnzTiuX0qR2INY6wyjKen7xEBAIf8yqR1XTqSV3DcIYady85NxQ3S5JixlQl6QZPjtO0awllu2JcB70Sx6tzZA-XReSbPteD69I2ySqOaHR5lFVxYEpPPlmt6kAOnbqxyq', 'creationTime': '2021-11-10T05:30:25Z', 'width': 3024, 'height': 4032}, {'id': 'AHNRPkca7pf49FUw8ajNITe4kz2S796WkeSDCzN4IVvtHA9ar62aIch-HUw0xMfOK130xao0iikjBrk5vAkrkLJIi33QpWXHPQ', 'baseUrl': 'https://lh3.googleusercontent.com/lr/AFBm1_Y_sQwwWjD9U3gWoPYnTcqz9_00ekGr7L-J74AXLRmSvsQoSfClw2mpfUtGhinWG2yP0Ovq70ol9jXMdVfjxiqhUMrKWS-6YCBsNEJYgxRu4iWy35e4A-yZoAhlRkB6eeQKAQPAITEOAU6alRGy2t3aNMpzxkFoOMy5S9e0tthWGlMXZyFfL1Y0xfPsY7ve3Ze33y2v9dUFjM5mViGLL78RXw7paI-NlLHqimRWCYVGtDzJ5BK16lo9PSVT-963h26oZYBRBWiw7SoFEAxl9uGOyWTv798wFEFqN9yuAQmVU_VtyyXshzKj-TA54j-9BTZZczgLdlGvSrW1imOoAt0B2ihT3eXOjCj6FyJ3oqmRdbsI0xWSC7qvUCQZ53uqxuA8AohCXUNx58jVMP1LFiHAxe2y5tIRIFbAufb3SbriHNaQj-6nrSqhWbiQJJstHL31u0zr0WhU_XiTaL7cIDhPkkr2FGA-Vi2hpfs17JCaa89eIhs_RZ0sO5ofUMUibhGPdZMl4GKxdo-CFLxj4mI5_y11YCD_2yJgVemubqSnBtQHCrAyGnyyXywEp6W5jhvoxjXy2fpjCQ3Xgzs6skiEAnzB-TmdvfpOWXgEN-G3S-2Q35LRaiVWGlZ5fnYojd8pFn4nVSYCI6CuTWJCjlVm59hDvKAKOhw6Z8VViXNu1OYht03KSBJBlHAAmcckxyW7hLRdZ_SdGnEEB9VnwhwmqHrZIRuKnyXKxp5EJ4w3ii2XkYOqRlJwZtIb3k96fl3PMMnzWVc6E623w-g-rQnMiS7OMxBw4vLldOZs5gkstNg5WHPqiqAPv0P145eyAkjaUjIzq3kZ', 'creationTime': '2021-11-10T05:38:00Z', 'width': 3024, 'height': 4032}, {'id': 'AHNRPkfCx7C59zAVEySYlbh8OsjZ3tSGUVPGGfQPWsjG9omUG8PfdkxWAopS1WZyCRObLoEMtIhOgcoyqf8r_a8rFFFpo3hFkg', 'baseUrl': 'https://lh3.googleusercontent.com/lr/AFBm1_ZOoJE_KNdDH3jAeEWJXWFmcS8PM8newcq8BmAz_6UbPZud116BJCbUlBQQ1_s3E6AUk2iAlhB_nucwobsS7utMZDTYcWww9N5VKO4vMXiX2ELClApWovyD6WNO5V3JNe3-gZWkgeD8Ke8cBQUsa9xHdJI7Kcyp44aJJtbWG1UOVEhNwvXMQPBMFYenxtwTicxiggNO0dsMFEUevHEQu6dbJS1-CTgctmRRvPT3BhJ4YZpP-KMrrZFClSqbnfQVzoKTEcJN-1Hc35HlVl0sx--GBSpH2tvcFIgqfAnjQvxonrTe7bPqrYTrQzvl1wGAt-jknIJWHphG0ZZuZWPCk_T_I_ewBkSwGDTLz2b_GfXkN1-n9E9JeMJPCTKfXiu59hFgAxPzF2vsBItvsRkpg2tUivFZL5c8CP9a88B5lfGUOnC8RmJ8CkkLWdywhnGqrHehxQp9gVKmPoj-_HMHi0eAmHkbikO5VqvXoFrVr1okUZdCsyU4rDAaTAMAj_N3OZ0w6unFGG-XqDMZbKNG-Z6gZsExyAs3Em3Br0XFFnbqkBN9frvV8aERk2Zh8CW55RwjUtVOteipdF0i-HlTe-muBudUw5TTF0Rjlah83BoWUBVCATcjHeydoU5VK9OfcD571XxQl3fcB1chbjw0vMndDID4kivKKG-x9zRFVXtLyNYPxlwThsNqiZOaQVR3ZphuetRDHDIUB35-vUmsEoEXYUf4Rk2zLOplu-M6kGNowSufY_YV7Tk8LBquFe1e7Rl2MmEVfx2phUO56TN838B32he1MjqT2IuHexKoG_tkU1-GKfPiQhtET7WV9x0Pz6voLeK2hUer', 'creationTime': '2022-04-23T18:03:32Z', 'width': 3024, 'height': 4032}, {'id': 'AHNRPkewwrGNTjsT4BtkaTQIxCFs73QRcTaMaMfMIPnxQcF2SojELDfA1zD8Y7zzQRsg0KM5fbi3CzZf9AbN-IxIdI5cS-y9Yw', 'baseUrl': 'https://lh3.googleusercontent.com/lr/AFBm1_aZzvoCHQChZQs3Jp0qpdMnJoD8K1KGVb4NxaRac5nS9MlYuRmeb8Sgktu6VOILshyWxCZAhmRzkEHQtfgvMTIcJNDJG0Ywl9hrFm0FFbYbrke01xLoVgGt3VpKfGWFjCHezwBsXeSCJF8DUtRJkmeoaaF9v7lTnUizjNstZQhcDNSUXtIkoX6C1Vx2pAhw4q8XSQV_gBTiM1_MZLn6gblusGx_TDVZk1UAUbiVmP-btirM4B7ZDMxYBl84ozBdOXbaJmFcVu-qePCNYZdj49Nu0E805fYB9vRW0XvTynPnkSvl--eZ5FeWZcuCQ0wPQKBJpiYfvdOdn7F_JkHiSGYXBxLnrVmLmiGiATdymAJAs9Ou-sGeX2xt_32C6kxvY0g9o2-wCSmjzEG8GH20gRyaradnpbELH4va7yy2wp3zq-TvIOeqCPaq_b5LkxcTBaKNpnawaZ3F8rfu7SbCFRlGPLjXvygqTbPBeZVtXpzhKbZbki8gp7_5hkBDQ9HHTWmDsK4Iz8jmsWHFsrlTWMVd8jiZqUj0oJet6t4W79ObGQB_KwcoBdKBX1rGFBQhD-J2O1T1lqVeSnNlzbG_737t2tNwhJP-ZMcFhpt66KGUE8IbtDr3kjgGI-_iwzPnpxCDtZ-kxthtr9G3igN71nfIjVuGMRWIwasozsUXCVccMvERUNUHBDl9Z8TWl_tAwadoaBwf73KmW79lNRKzKPBBMuAXgvr25xURsnIa0kkFc4hVUwP-dKb4Whng44DPE4TqvKKqyA6ADg3rw-MGSvrY1CYP0KVA_duywmTsiPm2tXOoS5SoCGhsO-LdNXOwYwoOG6MMTBeL', 'creationTime': '2022-04-25T15:31:31Z', 'width': 3024, 'height': 4032}, {'id': 'AHNRPkfLgIFVWy7J_s9fYKC8-c7Ui2Q7hu64ujqJBa1cmMLDGlgBR67H7VJJnM8lrRSQZq4C0WSiQXbqDFJxhbsz7GsX4CXewg', 'baseUrl': 'https://lh3.googleusercontent.com/lr/AFBm1_b_cyrgM-8qhhdgNJgg-Q400shI8u_4vORKAljvGlgrlCfV46qxCGtbeM52Jpu33cA9R3oNI98GXfkoQYe6hZ99qXJsh_FAxqT4ZUCy3gIRt602nrcyYSprBX7b8Hzhvl51xdfSYsuUoYhJBxzXGU2MTwPtgtJE7mbw2akHeNY937FmVw_XDzZczqjkVhh27Nfl5RVs3kLSzpyQS-IMFd6b9Ph37SD7KQGy3K_KQIlt4ZqXL-LsJGULlLeY8FpvNLyxMeN5_uLIOt5zkJ5axoF1gOw9yEtJ9xSTKS4CIoLdm_pkHrQhTWPUxUlofVgAsyPTcZZzkqIhJ1bwSSqIqPz8ak5wdfgVT4Kxf8-LuCL-axdoKyE6bZAkW55Hp3kavojGJyEvY3UlynFmCKwcqZZC70i10q2SNicsKYxHV0axbJnoYirTWbbZPrGvWstESK6FIY0fzl9VXFw0VRkcXU-K4BQHl96QpF2sreIOx_S1TqVzVQ6GPgsydIyL6HMiWw36f4-Yug71Z7lNXKmmKIZc-W3IqtnsRhQjSJ4Kto0Q-ZGtma8vel3TJDWDZyE1yXcD67yUcKCq2izz9D-fv1btofYoc0KjDLxW3eBmnRIuMhfRyasP-otINrXrw0sxSBCt59U8vZXBZve_AYMIarQsxwYW0dxRdp1qZKDGGxLYwsw9xDJseoRhOzrZm_vhwS7lBQbS9HdzsPNsoxEyLqq-jQcWrUAX1_PH2j2WUU5CvVXBGpcI_-gyWiZ1TZhH4dVLU75lrA0s9GM_31ivoyfrgTseYjhZ3aAHIiUXoCMJNfnjGvyLHVtC9_FJ6vt_c4VSkf5TAZvS', 'creationTime': '2022-04-25T15:32:03Z', 'width': 3024, 'height': 4032}, {'id': 'AHNRPkfwKROnlE21kGFy-BWueSMUUHwjnqx3J115iIbauMfT88g7rP4zBypvssKQvwNVEacATi14sVobZzmU8oL6JO9E8IWeQw', 'baseUrl': 'https://lh3.googleusercontent.com/lr/AFBm1_b23w3Vpc4V7v_nWTvTTAsSfDZBknAOV948xwNoyJSbK67I-6el-0tYwngdS8LPiefOJJ3DR28Yy1Jww4-M2dwtesmaLuUykrLqAis1uEwzB6-4gBGcp2E3qbQVYwF9ApDJkuPDnrBi0n9gdntj1PslW-FwM6s0IDmaMfkLwXXBJPcOuB9j7ZH5U-61sDxrC0RKamaGx9QVcpZ6p41bOcqabbz3pvcwgs5PdHhvskDgCEOQomId1a8oCcqZMWXpJhZHW_4DLw4woLAQmuqRhxrfiU3oZi4H6D0IqM4qNuKBA1btfUiFwca4eHJaRwFNA5SybACMbMPya5SJzkzFVCdLjjmbxwRZX59mIegJRGbmFHV_LuMomZJha7d1BnQtwM8wMI_rh_-63VhktirQf0o_Jfune5hT0URmgEoJDWMYxhlOrAnSDo1pat5Hdxndof725Tqg5uMbngVRwPpxNA-Ej3BfXSUzHJ9KAv4KiAS4kmUUpRFMKvArYD8yPSjUbaKuGBPkYMtysETx5OVbK_IMvRbc87BrQmEQ69wb1NlCLRxfU1OBg7Emet5sBjYF4EBmcioxtgfOAuH2mNmlSzCtmIAAIAJkckrUN3zUFSK-FVZrUZqRRdofy4cUYnrDCuZSf_9oHBU-dpiKR6Q6wm_GTONDtaF6WHE9dJIvAxwYCgsymEFq0P1ZOJwnVXJ6_t1znxgQNsAC7Bn52r5ZjWuuFqytllb1MCYizSM7tMrDohZdQkS9p7maLQn_opBzY5Ioy6jd53BTlmkJndtpD32a0OR-Osz04hEiZ9xSn2b-W1UzREXaIf9qM-D6bTOKQ-0Jzi_fkfBf', 'creationTime': '2022-04-25T15:32:08Z', 'width': 3024, 'height': 4032}, {'id': 'AHNRPkf4bP4fdBLg1yzvjGpbmMR0nLf8Ps0QVMW4iXuskmJVIq4GuhO4J1oNGYX4YdHi5wajlFCprmNuP-yhUGAPoaWJXeGICQ', 'baseUrl': 'https://lh3.googleusercontent.com/lr/AFBm1_b_voN-TyfBQs1YRi16OJkifeR042LauK7bFDg8hpOhKKDNIMpkMul8wY8rA-Eym-XitnkvM6MfiwjcHbtRkv0GWVeRgkt0KWThi5eKigW9zQ5FFk8-GEn72yhURBsfah8eRIGcGhHnX0ud2tLh_5MTR4kZEM6jblrIRkMccfgvSFVsKODfhg8wZVWZDhUpkIo6-BFWVsMm6Z9e83hyGNueJqzdlelcRbF2xRr6TO-aJ3EMrUSUbzeF9_pe7ulwljEV49BgplSERjEWGvDqoCYqhTL-OyyAx9oE7s-qvI4aiYijlU8LIKCQvxhPZMXT8Pp_O8TMsM9q36wgceatwym9-_Ayj3QJ1HdnoHBGYHSjcjE3dVUR5C6xQ80BOnMTnVFTUnF9yK1y4FNbLX-CRcvo5q46_csSJDCCA7bDMPSy9Eq9CDGj3XkePM7cljy18IJTcTCfY_eR8WiBj4ynSisAvnoYwEW17SjtBO0B4TgLs1--wIgh4aHk2i_bmFfzcTQ9p1Wn5J7_6oc0NPMec21COxfWr1V9kt7hg9hu8RE-yLelhlSWpoWqVleQm4puQ04EIZVR4ThDyNub3h7pf9Erxktsa0ntNSO6SQpUfa-oGBgBwzvWmYXHour_6-MuZi9-HlxwmgaBA25LnS8yR_2-AXFNgFw2o0zuTccEK6fVJ3A1Hj9tE8SW0yFikmaplyr44_qrTNVp7o32crv367CBLv2mg7dDVR2W9a7RNE4GO5WXECavxXl_67inYEk2Cdfmss-nPfY-CSy-jV-khGCzyDn-84K2LXbNxEDCo5IWz7eP8q_8Y156ipEylDPlA2PV58DMTDDR', 'creationTime': '2022-04-25T15:32:41Z', 'width': 3024, 'height': 4032}]
        const msPerDay = 1000 * 60 * 60 * 24;
        const datesAsString = photos.map(photo => photo.creationTime.slice(0, 10))
        const dates = photos.map(photo => new Date(photo.creationTime))
        const maxDate = new Date(Math.max(...dates))
        const minDate = new Date(Math.min(...dates))
        const rangeOfDays = Math.ceil((maxDate - minDate) / msPerDay)
        
        const disabledDays = []
        for (let i = 0; i < rangeOfDays; i++) {
            const curDate = new Date(minDate)
            curDate.setDate(curDate.getDate() + i)
            const curDateStr = stringifyDate(curDate)
            if (!datesAsString.includes(curDateStr)) {
                disabledDays.push(curDate)
            }
        }
        setData({
            photos: photos,
            minDate: minDate,
            maxDate: maxDate,
            disabledDays: disabledDays
        })
        handleChange(maxDate, photos)
    }, [])
    
    
    const handleChange = (date, photos=data.photos) => {
        const dateString = stringifyDate(date)
        setSelectedData({
            date: date,
            filteredPhotos: photos.filter(p => p.creationTime.slice(0, 10) === dateString)
        })
    }
    return (
        <>
            <Filter
                minDate={data.minDate}
                maxDate={data.maxDate}
                disabledDays={data.disabledDays}
                date={selectedData.date}
                onChange={handleChange}
            />
            <Detail />

            
        </>
    )
}

export default Home;