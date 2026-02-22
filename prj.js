function munculEfek(element) {
  element.classList.toggle("aktif");
}
window.onload = function() {
  document.querySelector(".Home").classList.add("muncul");
}

        
        function formatTime(hours, minutes) {
            return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
        }

        const baseTimes = {
            imsak: { h: 4, m: 15 },
            subuh: { h: 4, m: 30 },
            dzuhur: { h: 11, m: 50 },
            ashar: { h: 15, m: 10 },
            maghrib: { h: 17, m: 50 },
            isya: { h: 19, m: 10 },
            tarawih: { h: 19, m: 30 } 
        };

        
        async function generateSchedule() {
            const tableBody = document.getElementById('tableBody');
            const loader = document.getElementById('loader');
            
        
            loader.style.display = 'block';
            tableBody.innerHTML = '';

            await new Promise(r => setTimeout(r, 800));
            loader.style.display = 'none';

            let startDate = new Date('2026-02-17'); 

            for (let i = 1; i <= 30; i++) {
                
                let times = { ...baseTimes };

                
                times.subuh.m += Math.floor(i / 3);
                
                times.maghrib.m -= Math.floor(i / 4);
                
                times.tarawih.m += Math.floor(i / 2);

                
                let dateObj = new Date(startDate);
                dateObj.setDate(startDate.getDate() + (i - 1));
                const dateStr = dateObj.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
                const dayName = dateObj.toLocaleDateString('id-ID', { weekday: 'short' });

               
                const row = document.createElement('tr');
                row.className = 'table-row';
                
                
                row.style.animationDelay = `${i * 0.1}s`;

               
                row.innerHTML = `
                    <td><strong>${i}</strong><br><span style="font-size:0.8em; opacity:0.7">${dateStr} (${dayName})</span></td>
                    <td>${formatTime(times.imsak.h, times.imsak.m)}</td>
                    <td>${formatTime(times.subuh.h, times.subuh.m)}</td>
                    <td>${formatTime(times.dzuhur.h, times.dzuhur.m)}</td>
                    <td>${formatTime(times.ashar.h, times.ashar.m)}</td>
                    <td style="color: #ffaf40;">${formatTime(times.maghrib.h, times.maghrib.m)}</td>
                    <td>${formatTime(times.isya.h, times.isya.m)}</td>
                    <td class="tarawih-col">${formatTime(times.tarawih.h, times.tarawih.m)}</td>
                `;

                tableBody.appendChild(row);
            }
        }

        
        document.addEventListener('DOMContentLoaded', generateSchedule);

