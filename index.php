<?php get_header(); ?>

<div id="overlay"></div>

<div class="container frame">

  <nav class="col-md-3 col-sm-3" id="navigation-column-one"></nav>

  <nav class="col-md-3 col-sm-3" id="navigation-column-two">
    <div id="inner-nav-container-column-two"></div>
  </nav>
  
  <main class="col-md-6 col-sm-6" id="main-content-area">
    <div id="inner-container-main-content-area"></div>
  </main>

  
  <footer class="col-md-12">
    <div class="col-md-3 col-sm-3">
        <?php echo get_field("column_1", 131)?>
    </div>
    <div class="col-md-3 col-sm-3">
        <div class="line-break-single"></div>
        <?php echo get_field("column_2", 131)?>
    </div>
  </footer>

</div>

<?php get_footer(); ?>