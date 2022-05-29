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
        const photos = [{'id': 'AHNRPkcbfwaFhqU-3l1_C7s2SVkZsk26tyub-0iNWJR8MI8hWPC7vv7hyjo1mgNdsMZqQ83axX25_N7gZA-7pBkgcFRo63CruA', 'baseUrl': 'https://lh3.googleusercontent.com/lr/AFBm1_Zm-fS6JYvSEo_PWL5poaTQOrBoOlvUS4-mdF-HLe99b9IIAY5VXhzz3XZN6HJlJUImu_KoM8Qo-CySwVbOA8oBPxM8Zeossbu27dILuAFn5BhdkiSOq8H4_ku6VfFdZTzSiJGbjrgn31uX5MsMSVDEWof4Lc3FSIwJFbRlAIwREZR6JHD3oePZyYk1X4GYDrZZq64RHtA9Qifo7YkjmZX5OYP-g5gFyawZck8XS1PKFJlUssGK5D1SqO43N7TeYDzFGfrPaoG_uXU-hIt6cCYTEeU-PJyYpF5M10ygXe8I2OwAaNiMQTLMguIYbm1PcdzZ3lAnDssiwlJHQedkPLEe4JfeDmXRPOsSy6vd4Yi_YFgBr32f2vYCceNH7gtTGREkP1nod19ZE3fS6Eltssf9r5aIWwKfk4Mn4i4mFK9n2U0V65qLioyL2xOT5sMkzNTKe1XnYfhgtX1BOc3dcFg4ntyAZzZsVT1DgOA-LdWGMetBsgLvHLh5_-_Lot54cL2bbeDWwOE1HJoLrj_UhF7Jw9JbcAl3Q7NI2or4N7Wbvj-3FjQXq9v5lIsV5qj87d1inUIY6r8aqznfssgRkXtyxxyTKRLTcaWung7xHi2nTZJIEyQLlefLieUhAzCTb23R1bf_Qie3MlYBfNZ078JEeZYVCqPLlOIzLwN3FeO9U-X8-J1UIhIXIBso_fURjKvGgu-H0YkMsBGQFbSO4Eypa6BPGjI8J2NlRfs6DDV6SxT_UnCdwstNIa4ZlugdoBWM_oJAkywdrLDhK_WmNPIo9nnWc5czxB75kqX2OpqxesBIYkehet6_5OBamhd13NJi7IObUI_E', 'creationTime': '2021-11-10T05:28:28Z', 'width': 3024, 'height': 4032}, {'id': 'AHNRPkeZM7HaJey1M-R6hmkpkrKLDqv2YABV2eBLd94Rxqhad3HfbzfqSrNphoUo7JZC9JlUGMxtpJRcjCcwlMG1K20uzFTWRw', 'baseUrl': 'https://lh3.googleusercontent.com/lr/AFBm1_aBgOpZnO4ogwhsAR7X-tOVfxxOiro4qXJH3Gih8-4K0nfxeRPiSp2TNLLLTX-Vdvi6v0KsP3vm6DwrYc_HrBzoutFPwtd-PFjArdXL51wA1hpVs8ME2nf9NymC3kVAM1ipR8WCndhtl8zsw70Dj8WsJIczutaJLKY7fAeBzWacoTLcIyAO3Rk8bA10H5nBBW4p-oAfuazqAyQ2r1fuqlgGFgf3K5w7qdQU9nIMvcvkcs6-BihjGKDutJcJAleN90sh4ahlug0tu7BcYfDCaTxplMSoZ2OjIWuUIUHE_ub4mjq8rz4AWAykGeDOc5Vg7FnAI8WHd8lSeIfUXzOjIt_sWo6bWdQRj_fRl2a2tVaffHWeGwa3zPfQfeHtheWWKKR2W-Od2xMhPn5v2NrrKCxRTxL4CyNY2kIDa1wM0-WESu8C5zMUeL-TD2CJwf92vnPWPU6kdXNh7ZrM6iSpGjUnfIfEdbrY6K2FgGdGZm1oKif-JlZjeULJMclsFRqLIC2wCWm_XhnQoQdCNXuIRuLacFfeKKY57Fj5Evs1PT2nWIepIYI4iUAshl59jQBYPDgBgUWO3L8iMExyuS0oY6-CA_kfou12-QG2V0jvHFRBsBr8Ursb-c-KON6U7dOSiLw25eU1BJfPXdMNJY3FK21fsRBZpPMR2_5Eg9WuBknW8-YtIh951GkeZmvcHwabTykuDmgbl5TjVn-in-wJa2wjFxWCs70BStelo-e0xyRS8hUgryWYBJAICLsPsxcnwXTovZDu-W8JdhSePvgFYkRJ9khx7v65TVAHAKLpGBqUu61cD2dDmEaHU1FIV07BTqwbB8RvHuXO', 'creationTime': '2021-11-10T05:29:58Z', 'width': 3024, 'height': 4032}, {'id': 'AHNRPkc365HSpruWF-EqWi9TzCz_aOL750Q9HMbQ4UGaMCjBoYhJb12uNYdABxoRfBgktC4jBcbuAE46M9rWFrE0CbxKKbZoNA', 'baseUrl': 'https://lh3.googleusercontent.com/lr/AFBm1_bJbjaA0aINvZPHJ5okYNfVOlBpaYC8NruoN2859Hi7nnS9kY9c7qUxLR-JxCiKGSpbX93ekCE_GdZnOQqgxtEsvdxkUXsgU385aLBwFHres5jfAG9sL3kBC4JE9qdu32b2h5aR5NMdUyKIpECfC1i97auITrHEZh9tDwxkmbbsT5PBLkWbMe6BF8Y-XWfOdX6Fr4aIFyrjhaQJAWrSay2JRHn-7OP8afafBlbql1eO9xVy3v5oNlHQTy0mtpSFc5EhhXAhlb9gscke3no8W2E-mp6nBADGpd8gWGxFBZZC2sFrv-MJUc4BwX4-QlGUiJssWCPScD9r_4sNoLpr8cTzjP4EBxQH2H_X-JoltIWBY5GgNGsXWiyLZ56Uj_c2vea0o2oxYzq5TVblBLOJ6yfgEarYOVkmbwPpiJX16JIZAftZ_vjoHWgCZPjLgl0tkEpTnXDiATtW-EvAvk8gx88FS2BNQ-VdMchgLe5glPKZdqOEPBHZ6daGrWLRQP96_QxACNMKySOXDfUi1De9BN_67dPo2U6M_PZ-2tFyouMrkwEkOO1jH47ioNwQzCWBJITXwF9IsYi42GrexfVo53EaEmYNSpPnWIiB1L_2Qpony5CZzcLRVYOr_-gT5bO9fu0LcsgXDuYAXDhvlqR5eXcoA4ztwOXrmfV1jQ31XvhTe_7Egsx4NNPBj4QAbgXd_lTTnviNAdlkuYm0_fHbzN46B4ZP45rkQ3CBTW3oyQaJVCAveDB6kWgqgQwVk86rQ4lzJMzTEOUJ6Rj3jzj3KkhOu6PxkCW03qnfcu2SrkbsvzGnuWlhdu-J8I3ckjJ3ZdQfLywDv0SE', 'creationTime': '2021-11-10T05:30:25Z', 'width': 3024, 'height': 4032}, {'id': 'AHNRPkca7pf49FUw8ajNITe4kz2S796WkeSDCzN4IVvtHA9ar62aIch-HUw0xMfOK130xao0iikjBrk5vAkrkLJIi33QpWXHPQ', 'baseUrl': 'https://lh3.googleusercontent.com/lr/AFBm1_b-n8J-_wyWbM7JspSmF5SpQreZdtw5A_q6JyjdPNA1mTdx4SjY5QqYcl3m8X4eyJSJp_h6yD-uBZhzY2FX6oWIcME8BkHtalhkIBwt8kphZNQmuu1mWYbXKdR0MhQDWxG0jNHr3U5PBqgxjoz6d4Yul1lozHRCSfkRXjSGmm59QRtfXP2RWiE8R-QCe11bujoHXyov8lpVyjBfjSgR-j2Z71Aw7EY_AqkY7_2g5RKz5ndMO9nj_PwkBjpTkOqkP-dVuqgk2LIcNoz97yunQUho7EAFkrUD22m0VcaAj039pYLVux_T_ZNjeF6-jbni5Po81HeAzQs2xtvINdma7NyGoMFO3rvHDWviyiiPqhccPlj-PZHFjX4uI_hClpP8ik_QXorKc4zXiA0NDynDgZ5gIr6NXxs2YfJgW_MJRX1-4nt5le6vdt9AY2HOTCHniYaT_ZZJwuWH_0ofIoJui1RGOA5_Aq1E17n8lDWHql9rVCB7VJ9dhCZ7feQt51s6SFkwH5J0NUutmmg4qoBAavWlrvrEZGv2GkkQLfRsA2_B_ErCJ9oeOZYDjVlw74iWdhzFDbcLwROrg0l_rk611eDI5inA6teW5pITy8M9rVZ97FKe7ihvVyTuae-Le0YhwCy51Dg_0smiJwDbkcDQIpK8izzZ1NCow8Ab4pNi1JlOSbtvyXygdpRjqQem3FJovmR71AkQJhefJlwFskIhyxbuH-_13bxO9XuhehaA1O513m-l01r2cdgAJiJmvydMW6JY6m8Mn33Q5YzkqAI6TkZrfulvAbvPv97xDGaMBexRY2f6IRDNmbUYWQMav9POTfN2skg7Xn8o', 'creationTime': '2021-11-10T05:38:00Z', 'width': 3024, 'height': 4032}, {'id': 'AHNRPkfCx7C59zAVEySYlbh8OsjZ3tSGUVPGGfQPWsjG9omUG8PfdkxWAopS1WZyCRObLoEMtIhOgcoyqf8r_a8rFFFpo3hFkg', 'baseUrl': 'https://lh3.googleusercontent.com/lr/AFBm1_Z1_RveaXoo9uPpwTstHrMiX2MGIFqPxVlUZ1z_8tZd92WQWrGqKU4BU75Pxov1G6D5u0BqcmCifxgdk1jdr7PmVrpvLjPPJ2rWiI8nRmcDJfoMhz6JJyrtB-9Os_u-Ohzwv0FGxiLniBBrOq2RbP8aGx9DVXSIXnDBImQb3nn-gQoEHHP5DXLVZSftWOkl_qUGqxibs29l1xarnAf4w-AitZolIItPLihhJPdJYnC2AFy5Rxp-vANfgrx46iDx91nv4xs2vnHNIOZixzR3qlYh7ayeXOJFiA7L7m5_LY7dIhHjFMRcRZYnEJhRooLUO9Hw3dSlkAfSYiRkXDjfbMUUjgsDwF06Wt-19dDyzNutizifYqEpKb_vXMLdddCY7eOfvJfP73AhSUXpgiD4xnUooYyMOg92RyHFncZyineM9uQEbvw9Yt68lHQE_ZPCZ5BFBKfSXKXfS0rHEvpQ5uBJkTN7dIvJ6oK8bNWMF9igvB92_og38UjvFoR1rA2g7b22nhLk6wyZ66dykoTyyQpggq7NaibcGbnGUBB3G_E34vmPvnO60Gp_ltJyRSKdFMXVDGVKfUkRBqAoV8eouoe1-9OVP6Dxx3QI8-klXnwhBkW8TySpTV-uoLbUg68doK_LWZRqvWIKOG3JNCrAEEUaevWyVjC0zpwZPTgPI5hjlHgR-CrmFNUE-l5_rDpDMIiVREUAaCdPkmazFunXQAofnGVBoT1nAUshwDDQGH_RgSx1Ox19xORFknPAO7AIla8eDEI9-oDUYD52xt-jwuUbxXW5UgPk-ea-iNjYkTM0fkUdMK1cUjMqkIcqyH-vLCAnhVqhqPBv', 'creationTime': '2022-04-23T18:03:32Z', 'width': 3024, 'height': 4032}, {'id': 'AHNRPkewwrGNTjsT4BtkaTQIxCFs73QRcTaMaMfMIPnxQcF2SojELDfA1zD8Y7zzQRsg0KM5fbi3CzZf9AbN-IxIdI5cS-y9Yw', 'baseUrl': 'https://lh3.googleusercontent.com/lr/AFBm1_ZRvGoMHIYKUNSfXmqkAKdKXVMKKH1_-u4erQQF-dKRvxxZ4a4-_YvuHxH6pFQO8pSSHKLVSQOjASDlb8QUusZladGA93CwoiidjOVq8hFdg-rpq9zPh44Z3ijGaGbR12M0VT7n81FYkyZcqhTcNT1IIbA3_Kn6hl0piPH31I2FDgyqTpXoAoIp9OloU3ZdLMG8sdRErkU69DBdqShy7l5n4J0vg4mg4jr_WBckOpBYrFdc8IqgOGd1d2h6A4LxwW1JR3bzYVAmhVJ55kQzKwIeYerjWtLc7-bzlNmgVLUruHfbueN7wDgnW7IItUryxXK3rSHq8qqu7SZ4y4QBqUleKsoIBs9dreBYiVF1kgzJXrxm4izfk3su-o-IfO1uPCWCvyvNLsfQrsHgCG9y-Gkev7SPPZ4X7rPfRm9KkN7I5gZqDmw1RmS7hcgJMcJnzDzdyTgcLVfRdI8f7IbY3JqeEqJ0mcC2IAGC4pzczHLF-OBpyR30eRHsv6jvpQB65pvjSF1mg4bIxil-7qku91p9pbuWukSJDyJ4WUl0uMoGBbMhtjRoDftn9hClXJdz_F-O-IJnr2QCPMuQ1ng4xfpnCEYWHB1sJgxXdfD2xLNTK_wlnofpzSYAEuyxhGUgcBliqzC_k7RB9RNjxallC6HR88n1AjqfoPbCE5eTpqkR-qv4whXZbxqvnrTVZ4hXmqXyECMwmkRQY3hEkPRrbRAp2aluD7-0Re3-hrXQ3UMn9clTIrpG-rHG0SYLEKNHSXrO8Jxb7zL_FEivaWVKVIihf3JHL3ePCuhSEdXJadaFDH5Jk8Ror1q3xQ3nvEzsonk8qx9BAGkl', 'creationTime': '2022-04-25T15:31:31Z', 'width': 3024, 'height': 4032}, {'id': 'AHNRPkfLgIFVWy7J_s9fYKC8-c7Ui2Q7hu64ujqJBa1cmMLDGlgBR67H7VJJnM8lrRSQZq4C0WSiQXbqDFJxhbsz7GsX4CXewg', 'baseUrl': 'https://lh3.googleusercontent.com/lr/AFBm1_a43zajNI32jOXKzPKuCJwqam_XaFQ9kw_DbXMmgqTq9BN_WwDGB1DqsklfearBFUzd_Vs2fr3Pf4rr70xY-asjKOrNgGaApQxczX924S3vGca72y6-3nu4vruFglEpaHTGJq_bxyB7tiYeDwsroy_VNLRinGyp0ILFmXcx6S7r8fiz5CHEUPUp_BySXujxYGCf5jrD4ch7Pw-bYZcLb0xBlPKaeKmTaOusd_X1kpgsXusyCzffuFwC5wyNuQe0D1Azb-5bTUb6YXEDy3A4bZdIH1gbKUqlB2Pm_SoD2mAAzSLEb05hdIzJaaau3dr0b_8HSJuAVD4yhFLry45yVj4k-QhKqkglCWJL6OmXl_k-cfn9l27HXtxqU7JUT3aemW8a191mIvpYoF22w3-CpHnWa7WJE7FmVQ6IJ-Edig8VLfCfxNsW6QFM3KCuuIUDgBSdHMafwJirkRAFdgfFQAcekWXQZ9IzgQpDrw6qYykK97qS4BwD6pIxWJW9RpO5EA3F6bCDAbk7OHzmx-F0vVrBHTf_JrMRRaoqyqFhlVcn_7bt2UoGu0hBcM3AKxqB1SDCtPKmwwf1c81i6s4pWcFvu-ynchIwAiNN5I_TbObORMdATWNBnzOAiCk6gdmAoDdEAZO1V7WjwZwCZA4hHKcFXIiitCHMJudwE9Zs7dicnzugzYNDApsxe4BpL-rffSXPtwjwQm4VQqkJLk9exFg6fccJZe-q7oGwtBC0STImonM_TbBAwOrqRStIXXPoQ7QGAGp4GI7L5DHluF2aRkpqEFY83Wn0gOQbEM4Z8qmKg6Pv6ji7fzVt5mKDpq4qfElTSIqfq2tR', 'creationTime': '2022-04-25T15:32:03Z', 'width': 3024, 'height': 4032}, {'id': 'AHNRPkfwKROnlE21kGFy-BWueSMUUHwjnqx3J115iIbauMfT88g7rP4zBypvssKQvwNVEacATi14sVobZzmU8oL6JO9E8IWeQw', 'baseUrl': 'https://lh3.googleusercontent.com/lr/AFBm1_a4cJxX0eKvWNeGQoXMwVcekuoj43jXUx18Hg4nGlGbMw69T4E2F3dim2rXdw55GEyMmngpd29J-4sDnf8yefgbPMFld-KmiYfHatY3K3mcR4f-ZtDXq3RQ3vS7OOVeHUXNZWKwOEFBe29kBc5H0Fdn3-QEUdnP-uJwyQyH319ee8oLfy71nexMvdAqIp_wcuY91Lb-xyLW8AeJWnHq3e2HmcDtTOj6h5s92S_uJ7H2s2F-yyoouJ0VGKc6g8qDZsrX03zBmBDrtbiyNmsTgM4DQ6YVEf_Pv34cb_uu3L9biAqiB3GnTfOf27ax9l-qBqMqJOucm2DkJp_h8Sw3DhkwSKLbZR7WuE6XXqSb4-Dm4aXBVdiHQgFdujTD2D68LiKaqRlY_5vjjB2nA7XJcDBQ003sC4IC9txE5lfTeXrVgoE_D0xR9KyRWhCJtIT87lATps_qXFwALZleEQVjIT2ktx0Ld9q-SRUxjQX6dmFRP4cxlixVF3cZez3INptuhBlDBxq_ugvWsJXnATHQO5l-mJcK95bUWV4JGP6m6ElHzMFH-24vm9FEmJqEo907u5w7_q-NaJLmKsYtTufhmiynXksRvBckqOtJmjKY5PXd5QmP-WUEKGHFiXX-dZaA_xxDBQeCVceySoyRbM-8EmEQzrLGiIA1GzP6s3CnXffqyZTbKCF0jAhHwLPQmUXwOZB-43afntDTy5QwLE5Qfdw0xnycjA7VzPILvoT7aeFImgN-mIlejHmEAa2a1n34sfKmwpcrn77Nlt4w6nJ8VZv_jvtG2hgLQ_3mq-4CNXW79xVnY8BfyNgrxAiolvCd-iSybux9I3Gu', 'creationTime': '2022-04-25T15:32:08Z', 'width': 3024, 'height': 4032}, {'id': 'AHNRPkf4bP4fdBLg1yzvjGpbmMR0nLf8Ps0QVMW4iXuskmJVIq4GuhO4J1oNGYX4YdHi5wajlFCprmNuP-yhUGAPoaWJXeGICQ', 'baseUrl': 'https://lh3.googleusercontent.com/lr/AFBm1_YcOFQu4N7LzEKjYbVfQ4KgYFdnGA1TU6lG_95n1zEafIFVLm1yVDIuhQirHgCNa8yzQw4Z-WZ09o0jNZ5hRph5ZvA9FjWpSOr2HMYW80mauTijFSpG9KTETmt6o1DGeRa1aSv0SbBo3evmB5QmmK6mTrcRmlYqqMhEDgmlHZNJJEQOpFhuZW9GVUl90bv8sPPnpYnqL2ZCEyh7QxFePevqwSprQn5XdDezpa9uyouB7kcPqKtS7F_RXwBAQ6JFybmM_wUdfHvF5XXTP-d3jbNOsnz3Zetcqu98hV7dN1lLQZOI_YNSQW_1Tfdj6ueSzLmJuzP4JqHGcoM9J0_zSbHCkIphHWcwrBkxj5wHNdfG7lVKqDEwdrOgkrfsa6CSj6gQDJjWOAk8iqql8Cf4z21-9_g5BTDhD673a0-j2Kl8Wx9jxn0hgPrZVvLYhUX4vNwYO09iLXj2tuVjHkNh_U78YcX02TTtgtIWGKAtJzakbToD-XVRwV_GvGpApLv6go8NlCL38UnN_swVhHE5IbOjTIWV4lfUBVUrLZ2W0k4c3FHs30CCojiy8IP3FinhyiVzT_PVEPe19NlwgXqAqkta3KhW8CI89-JnVXz3ALlF_O8bKCf-DdA0efNgL1oBpu6cxA1VbCyxtISei-7Ac7Xs0wA_GCffnS3EcqFvwl5jpkClp_gwvKRYUVPdJL9-LRD_IEqOlwOozOPt5-8Nb4iVOdMd_URr5ipc-vA-I99GjHCnEMfEfdZbz3OyKarz5h_zxd3pk9b5RcoGa9RdSYdUfB8L8O2IbYXss-crBRJHNFOesTjWtUBtLeXRfIGnF7E5aOfzi0XT', 'creationTime': '2022-04-25T15:32:41Z', 'width': 3024, 'height': 4032}]
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
            <h2 className='vm-md'>Photo Viewer</h2>
            <Filter
                minDate={data.minDate}
                maxDate={data.maxDate}
                disabledDays={data.disabledDays}
                date={selectedData.date}
                onChange={handleChange}
            />
            <Detail
                photos={selectedData.filteredPhotos || []}
                numPerRow={3}
            />

            
        </>
    )
}

export default Home;