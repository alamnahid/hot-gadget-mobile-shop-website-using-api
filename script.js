// const loadPhone = async()=>{
//     const res = await fetch('https://openapi.programming-hero.com/api/phones?search=iphone');
//     const data = await res.json();
//     const phones = data.data;
//    displayPhones(phones);
// }
const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll);
}


const displayPhones = (phones, isShowAll) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = ''
    if(!isShowAll){
        phones = phones.slice(0,12);
    }

    const showAllButton = document.getElementById('show-all-btn');
    if(phones.length>10){ // && !isShowAll
        showAllButton.classList.remove('hidden');

    }
    else{
        showAllButton.classList.add('hidden');
    }
    phones.forEach((phone) => {
        

        const phoneCard = document.createElement('div');
        phoneCard.classList = `w-[22.75rem] h-[39.5rem] rounded-lg bg-[#FFFFFF] border border-gray-300`;
        phoneCard.innerHTML = `
        <div style="background: rgba(13, 110, 253, 0.05);" class="w-[19.625rem] h-[18.75rem] rounded-lg mx-auto mt-[1.56rem]" >
        <div class="h-[18.75rem] flex justify-center items-center">
            <img src="${phone.image}" alt="">
        </div>

    </div>

    <h1 class="text-[#403F3F] text-center font text-2xl font-semibold mt-6">${phone.phone_name}</h1>
    <p class="text-[#706F6F] text-center font text-lg w-[18.1rem] mx-auto mt-4">There are many variations of passages of available, but the majority have suffered</p>
    <h2 class="text-[#403F3F] text-center font text-2xl font-semibold mt-6">$999</h2>

    <div class="text-center mt-4">
        <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-secondary border-none text-white text-xl font-semibold bg-[#0D6EFD] w-[11.25rem] h-12 rounded-lg">Show Details</button>
    </div>
        `;

        phoneContainer.appendChild(phoneCard);
    });
    toggleLoadingSpinner(false);
}

const handleSearch=(isShowAll)=>{
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText)
    toggleLoadingSpinner(true);
    loadPhone(searchText, isShowAll);
}

const toggleLoadingSpinner = (isLoading)=>{
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }
    else{
        loadingSpinner.classList.add('hidden');
    }
}

const handleShowAll = ()=>{
    handleSearch(true);
}

const handleShowDetails= async (id)=>{
    console.log('click show all ', id)
    // data load
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    showPhoneDetails(phone);

}

const showPhoneDetails = (phone)=>{

    const modalInfoConatiner = document.getElementById('modal-ifo-container');
    // console.log(phone)
    modalInfoConatiner.innerHTML=`
    <div style="background: rgba(13, 110, 253, 0.05);" class="h-[30.18rem] rounded-r-lg flex justify-center items-center">

                            <img src="${phone.image}" alt="">

                        </div>
                        <h3 class="text-[#403F3F] text-center font text-3xl font-semibold mt-8">${phone.name}</h3>
                        
                        <p class="text-[#706F6F] font text-sm font mt-6 ">You won’t find a better place to buy iPhone. We know about carriers, payment options, and more. And we make it easy to understand.</p>

                        <p class="text-[#706F6F] font mt-5 font-normal text-base">
                            <span class="text-[#403F3F] font-semibold text-base">Storage :</span> 
                            ${phone.mainFeatures.storage}
                        </p>
                        <p class="text-[#706F6F] font mt-5 font-normal text-base">
                            <span class="text-[#403F3F] font-semibold text-base">Display Size :</span> 
                            ${phone.mainFeatures.displaySize}
                        </p>
                        <p class="text-[#706F6F] font mt-5 font-normal text-base">
                            <span class="text-[#403F3F] font-semibold text-base">Chipset :</span> 
                            ${phone.mainFeatures.chipSet}
                        </p>
                        <p class="text-[#706F6F] font mt-5 font-normal text-base">
                            <span class="text-[#403F3F] font-semibold text-base">Memory :</span> 
                            ${phone.mainFeatures.memory}
                        </p>
                        <p class="text-[#706F6F] font mt-5 font-normal text-base">
                            <span class="text-[#403F3F] font-semibold text-base">Slug :</span> 
                            ${phone.slug}
                        </p>
                        <p class="text-[#706F6F] font mt-5 font-normal text-base">
                            <span class="text-[#403F3F] font-semibold text-base">Release data :</span> 
                            ${phone.releaseDate}
                        </p>
                        <p class="text-[#706F6F] font mt-5 font-normal text-base">
                            <span class="text-[#403F3F] font-semibold text-base">Brand :</span> 
                            ${phone.brand}
                        </p>
                        <p class="text-[#706F6F] font mt-5 font-normal text-base">
                            <span class="text-[#403F3F] font-semibold text-base">GPS :</span> 
                            AYes, with A-GPS, GLONASS, GALILEO, BDS, QZSS
                        </p>
    `

    showDetailsModal.showModal();
}
loadPhone('iphone')

