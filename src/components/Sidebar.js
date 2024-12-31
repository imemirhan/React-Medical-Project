import $ from 'jquery';
function Sidebar() {
  $(document).ready(function() {
    $('.sb-accordion-category > li > label input').each(function() {
      if($(this).attr('checked', false)) {
        $(this).parent().parent().find('ul').hide();
      }
    })  
  })
  
  $('.sb-accordion-category > li > label span').click(function(e) {
    e.preventDefault();
    
    if($(this).parent().find('input').is(':checked')) {
      $(this).parent().find("input").attr('checked', false); 
      $(this).parent().parent().find("ul").slideUp();
    } else {
      $('.sb-accordion-category input:checked').attr('checked', false);
      $('.sb-accordion-category > li > label + ul').slideUp();
      $(this).parent().find("input").attr('checked', true);
      $(this).parent().parent().find("ul").slideDown();
    }
  })
  return (
    <div class="sb-accordion">
      <h3 class="white">Management</h3>
      <ul class="sb-accordion-category" id="">
        <li>
          <label>
            <input type="checkbox" />
            <span>Cinema Configuration</span>
          </label>

          <ul>
            <li class="sb-active">
              <a href="home">About Cinema</a>
            </li>
            <li>
              <a href="home">Screen Types</a>
            </li>
            <li>
              <a href="home">Screens</a>
            </li>
            <li>
              <a href="home">Screen Features</a>
            </li>
            <li>
              <a href="home">Weekly Email Configuration</a>
            </li>
            <li>
              <a href="home">Payment Gateway Settings</a>
            </li>
          </ul>
        </li>

        <li>
          <label>
            <input type="checkbox" />
            <span>Company Configuration</span>
          </label>

          <ul>
            <li>
              <a href="home">About Company</a>
            </li>
            <li>
              <a href="home">Company Users</a>
            </li>
          </ul>
        </li>
      </ul>
      <br />
      <h3 class="white">Online Ticketing</h3>
      <ul class="sb-accordion-category" id="">
        <li>
          <label>
            <input type="checkbox" />
            <span>KTix</span>
          </label>

          <ul>
            <li>
              <a href="home">About Cinema</a>
            </li>
            <li>
              <a href="home">Screen Types</a>
            </li>
            <li>
              <a href="home">Screens</a>
            </li>
            <li>
              <a href="home">Screen Features</a>
            </li>
            <li>
              <a href="home">Weekly Email Configuration</a>
            </li>
            <li>
              <a href="home">Payment Gateway Settings</a>
            </li>
          </ul>
        </li>

        <li>
          <label>
            <input type="checkbox" />
            <span>Ticket Sales List</span>
          </label>

          <ul>
            <li>
              <a href="home">About Company</a>
            </li>
            <li>
              <a href="home">Company Users</a>
            </li>
          </ul>
        </li>

        <li>
          <label>
            <input type="checkbox" />
            <span>Ticketing Settings</span>
          </label>

          <ul>
            <li>
              <a href="home">About Company</a>
            </li>
            <li>
              <a href="home">Company Users</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
